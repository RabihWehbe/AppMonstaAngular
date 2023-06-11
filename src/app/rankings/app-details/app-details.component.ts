import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModel } from 'src/app/Models/AppModel';
import { AppService } from 'src/app/Shared/app_service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit{
  country = "";
  store = "";
  app : AppModel = new AppModel();
  screenshots_sample = [];

  //date for going back purposes
  date = "";

  constructor(private route : ActivatedRoute,private appService : AppService){

  }

  ngOnInit(): void {
    this.app = this.appService.selectedApp;
    this.country = this.route.snapshot.params['country'];
    this.store = this.route.snapshot.params['store'];
    this.date = this.route.snapshot.params['date'];
    this.screenshots_sample = this.app.screenshot_urls.slice(1,4);

    this.screenshots_sample.forEach(
      elem => console.log(elem)
    )
  }

}
