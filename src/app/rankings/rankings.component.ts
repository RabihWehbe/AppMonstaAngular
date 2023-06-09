import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../Shared/auth_service';
import { GenresService } from '../Shared/genre_service';
import { GenreRequest } from '../Models/GenreRequest';
import { GenreRankingModel } from '../Models/GenreRankingModel';
import { GenreModel } from '../Models/GenreModel';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit{


  selectedDate = '2023-06-06';
  isValid = true;
  token = '';

  countries = ['US','CN','AR','BR','FR','DE','JP','PL','PT','RU'];

  selectedCountry = this.countries[0];

  genres : GenreModel[] = [];

  store = 'android';

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


    var genreReq = new GenreRequest();

    genreReq.date = this.selectedDate;
    genreReq.country = this.selectedCountry;
    genreReq.store = this.store;

    this.genresService.getGenres(genreReq)
    .then(
      (res : any) => {
        if(res['status'] == 400){
          console.log(res['title']);
        }
        else{
          this.genres = res;

          this.genres.forEach((elem : GenreModel) => {
            console.log(elem);
          })
        }
      }
    );
    
  }


  constructor(private cookieService : CookieService,private router : Router,private authService : AuthService
    ,private genresService : GenresService){
    
  }



  onStoreChange(store : string){
    if(store == 'android'){
      console.log(`selected store: ${store}`);
    }
    else if(store == 'ios'){
      console.log(`selected store: ${store}`);
    }
  }


  onCountrySelected(){
    console.log(this.selectedCountry);
  }

  onDateSelected(){
    console.log(this.selectedDate);
  }

}
