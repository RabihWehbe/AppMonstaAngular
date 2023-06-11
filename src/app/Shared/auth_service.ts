import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { UserModel } from "../Models/UserModel";
import { API_URLS } from "./api_url_list";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root"
})
export class AuthService{

    user : UserModel = new UserModel();
    
    constructor(private http: HttpClient,private cookieService : CookieService){
    }


    login(user : UserModel) : Promise<string>{
        return new Promise<string>((resolve,reject) => {
            this.http.post(API_URLS.base_url + API_URLS.login_url, user)
            .subscribe((res: any) => {
                let expDate = new Date();
                expDate.setDate(expDate.getDate() + 1);
                this.cookieService.set('token', res['token'], expDate);

                this.user.UserEmail = user.UserEmail;
                this.user.Password = user.Password;


                resolve("successful login");
            },
                (error) => {
                    if (error.error.errorMsg) {
                        console.log(`error: ${error.error.errorMsg}`);
                        resolve(error.error.errorMsg);
                    }
                    else {
                        console.log('nothing to display');
                        resolve('unknown error occured');
                    }
                }
            );
        });
    }


    signUp(user:UserModel) : Promise<string>{
        return new Promise<string>(
            (resolve,reject)=>{
                this.http.post(API_URLS.base_url + API_URLS.register_url, user)
                .subscribe(
                    (res : any) => {
                        let expDate = new Date();
                        expDate.setDate(expDate.getDate() + 1);
                        this.cookieService.set('token', res['token'], expDate);
                        resolve("successful signup");
                    },
                    (error) => {
                        if (error.error.errorMsg) {
                            console.log(`error: ${error.error.errorMsg}`);
                            resolve(error.error.errorMsg);
                        }
                        else {
                            console.log('nothing to display');
                            resolve('unknown error occured');
                        }
                    }
                )
            }
        );
    }


    checkHealth(token : string) : Promise<boolean>{
        return new Promise((resolve,reject) => {
            var token = this.cookieService.get('token');
            const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);
            this.http.get(API_URLS.base_url + API_URLS.check_token_url,{headers}).subscribe(
                (res) => {
                    console.log(res);
                    resolve(true);
                },
                (error) => {
                    console.log(error);
                    resolve(false);
                }
            );
        });
    }
}