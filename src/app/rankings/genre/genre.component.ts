import { Component, Input, OnInit } from '@angular/core';
import { GenreModel } from 'src/app/Models/GenreModel';
import { GenreRequest } from 'src/app/Models/GenreRequest';
import { AppService } from 'src/app/Shared/app_service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit{
 

  @Input() genre : GenreModel = new GenreModel();
  @Input() store = "android";
  first_app_url = "";

  error_message = "";

  loading = true;

  ngOnInit(): void {
    const app_id = this.genre.ranks[0];

    var genreRequest = new GenreRequest();

    genreRequest.country = this.genre.country;
    genreRequest.store = this.store;

    this.appService.getAppById(app_id,genreRequest).then(
      (res) => {
        if(res['status'] == 400){
          this.error_message = "Something went wrong";
        }
        else{
          this.first_app_url = res['icon_url'];
        }
      }
    );
  }


  constructor(private appService : AppService){

  }

}
