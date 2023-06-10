import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModel } from 'src/app/Models/AppModel';
import { GenreModel } from 'src/app/Models/GenreModel';
import { GenreRequest } from 'src/app/Models/GenreRequest';
import { AppService } from 'src/app/Shared/app_service';
import { GenresService } from 'src/app/Shared/genre_service';

@Component({
  selector: 'app-genre-apps',
  templateUrl: './genre-apps.component.html',
  styleUrls: ['./genre-apps.component.css']
})
export class GenreAppsComponent implements OnInit{


  //selected genre:
  genre : GenreModel = new GenreModel();

  //genre request parameters:
  date = "";
  country = "";
  store = "";


  //pagination parameters
  pageSize = 3;
  currentPage = 1;
  showLoadMore : boolean = true;


  apps : string[] = [];
  appsSliced : string[] = [];

  displayedApps : AppModel[] = [];

  constructor(private route : ActivatedRoute,private genresService : GenresService,private appService : AppService){

  }

  ngOnInit(): void {
    this.genre = this.genresService.selectedGenre;
    this.date = this.route.snapshot.params['date'];
    this.country = this.route.snapshot.params['country'];
    this.store = this.route.snapshot.params['store'];

    this.apps = this.genre.ranks;

    this.loadMore();
  }

  loadMore(): void {
    this.currentPage++;
    const nextPageItems = this.getSubsetOfItems(this.currentPage);
  
    if (nextPageItems.length === 0) {
      this.showLoadMore = false; // No more items to load
    }

    let genreRequest = new GenreRequest();
    genreRequest.country = this.country;
    genreRequest.date = this.date;
    genreRequest.store = this.store;

    nextPageItems.forEach((id) => {
      this.appService.getAppById(id,genreRequest)
      .then((app) => {
        this.displayedApps.push(app);
      });
    });

  }
  

  getSubsetOfItems(page: number): any[] {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = page * this.pageSize;
    return this.apps.slice(startIndex, endIndex);
  }


  onAppClick(app : AppModel){
    console.log(app.id);
  }

}
