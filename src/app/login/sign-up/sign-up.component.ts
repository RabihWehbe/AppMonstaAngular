import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/Shared/auth_service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  UserName = "";
  UserEmail : string = "";
  Password : string = "";
  message = "";

  ngOnInit(): void {
    
  }


  constructor(private authService : AuthService,private cookieService : CookieService,private router : Router){

  }



  signup(signupModelForm : NgForm){
    if(!signupModelForm.invalid){
      var user = new UserModel();
      user.UserName = this.UserName;
      user.UserEmail = this.UserEmail;
      user.Password = this.Password;
      
      this.authService.signUp(user).then(
        (msg) => {
          if(msg != "successful signup"){
            this.message = msg;
          }
          else{
            this.router.navigate(['/rankings']);
          }
        }
      );
    }
  }

}
