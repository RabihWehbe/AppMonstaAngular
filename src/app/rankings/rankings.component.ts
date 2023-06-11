import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Shared/auth_service';
import { GenresService } from '../Shared/genre_service';
import { GenreRequest } from '../Models/GenreRequest';
import { GenreModel } from '../Models/GenreModel';
import { GenreComponent } from './genre/genre.component';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit{

  //auth parameters
  isValid = true;
  token = '';


  genres : GenreModel[] = [];

  displayedGenres : GenreModel[] = [];

  countries = ['US','CN','AR','BR','FR','DE','JP','PL','PT','RU'];

  //request parameters
  selectedDate = '2023-06-09';
  selectedCountry = this.countries[0];
  store = 'android';


  //pagination parameters
  pageSize = 3;
  currentPage = 1;
  showLoadMore : boolean = true;

  loading = false;

  //validation params:
  valMessage = "";

  ngOnInit(): void {
    if(!this.cookieService.check('token')){
      console.log("check cookie in ranking");
      this.router.navigate(['/login']);
    }

    this.token = this.cookieService.get('token');
    this.authService.checkHealth(this.token)
    .then((result) => {
      this.isValid = result;

      if(this.isValid == false){
        this.router.navigate(['/login']);
      }
      else{
        console.log("Valid Authentication");
      }
    });


    this.loading = true;
    var genreReq = new GenreRequest();

    genreReq.date = this.selectedDate;
    genreReq.country = this.selectedCountry;
    genreReq.store = this.store;

    this.currentPage = 1;
    this.showLoadMore = true;

    this.displayedGenres = [];

    this.genresService.getGenres(genreReq)
    .then(
      (res : any) => {
        if(res['status'] == 401 || res['status'] == 400){
          console.log(res['title']);
        }
        else{
          this.genres = res;
          this.loadMore();
        }
        this.loading =false;
      }
    ).catch((error) => {
      this.valMessage = "Something went wrong please try again later";
      this.loading = false;
    });
    
  }


  constructor(private cookieService : CookieService,private router : Router,private authService : AuthService
    ,private genresService : GenresService){
    
  }


  loadGenres(){
    this.loading = true;
    var genreReq = new GenreRequest();

    genreReq.date = this.selectedDate;
    genreReq.country = this.selectedCountry;
    genreReq.store = this.store;

    this.currentPage = 1;
    this.showLoadMore = true;

    this.displayedGenres = [];
    this.genres = [];
    this.valMessage = "";

    this.genresService.getGenres(genreReq)
    .then(
      (res : any) => {
        if(res['status'] == 400){
          console.log('app error');
          console.log(res['title']);
        }
        else{
          this.genres = res;
        }
        this.loading =false;

        this.loadMore();
      }
    ).catch((error) => {
      console.log('Backend error');
      console.log(error);
      this.loading = false;
      this.valMessage = "unauthorized content, please try again with different search parameters";
      console.log("val message: "+this.valMessage);
      // Display the error message in the UI as per your requirement
  });
  }

  onStoreChange(store : string){
    this.store = store;
    this.loadGenres();
  }


  onCountrySelected(){
    console.log(this.selectedCountry);
    this.loadGenres();
  }

  onDateSelected(){
    console.log(this.selectedDate);
    this.loadGenres();
  }





  loadMore(): void {
    this.currentPage++;
    const nextPageItems = this.getSubsetOfItems(this.currentPage);
  
    if (nextPageItems.length === 0) {
      this.showLoadMore = false; // No more items to load
    }
  
    // Update the displayedGenres array with the newly fetched items
    this.displayedGenres.push(...nextPageItems);
  }
  

  getSubsetOfItems(page: number): any[] {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = page * this.pageSize;
    return this.genres.slice(startIndex, endIndex);
  }


  onGenreClick(genre : GenreModel){
    this.genresService.selectedGenre = genre;
    const routeParams = {store: this.store,country: this.selectedCountry,date:this.selectedDate};
    this.router.navigate(["rankings/genre-apps",routeParams]);
  }


  logout(){
    this.cookieService.delete('token');
    this.router.navigate(['']);
  }
}
