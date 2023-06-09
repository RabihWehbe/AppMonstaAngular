import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  ngOnInit(): void {
    
    if(!this.cookieService.check('token')){
      this.router.navigate(['welcome']);
    }

    else{
      this.router.navigate(['/rankings']);
    }
    console.log("Ng on init");
  }

  constructor(private router : Router,private cookieService : CookieService){

  }


}
