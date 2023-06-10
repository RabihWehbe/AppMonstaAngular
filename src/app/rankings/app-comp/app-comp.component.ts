import { Component, Input, OnInit } from '@angular/core';
import { AppModel } from 'src/app/Models/AppModel';
import { NgxStarRatingComponent } from 'ngx-star-rating/public-api';

@Component({
  selector: 'app-comp',
  templateUrl: './app-comp.component.html',
  styleUrls: ['./app-comp.component.css']
})
export class AppCompComponent implements OnInit{

  @Input() app : AppModel = new AppModel();


  ngOnInit(): void {
    
  }

}
