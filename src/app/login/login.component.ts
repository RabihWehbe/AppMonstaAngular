import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../Models/UserModel';
import { AuthService } from '../Shared/auth_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  UserEmail : string = "";
  Password : string = "";
  message = "";

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  constructor(private router : Router,private cookieService : CookieService,private authService : AuthService ){
    
  }



  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Check if the value matches the email format
    if (control.value && !emailRegex.test(control.value)) {
      return { 'invalidEmail': true };
    }
  
    // Return null if the value is valid
    return null;
  }

  login(loginModelForm : NgForm){
    if(!loginModelForm.invalid){
      var user = new UserModel();
      user.UserEmail = this.UserEmail;
      user.Password = this.Password;
      
      this.authService.login(user).then(
        (msg) => {
          if(msg != "successful login"){
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
