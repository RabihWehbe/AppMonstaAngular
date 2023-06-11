import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { GenreRequest } from "../Models/GenreRequest";
import { API_URLS } from "./api_url_list";
import { AppModel } from "../Models/AppModel";

@Injectable({
    providedIn: "root"
})
export class AppService{


    public selectedApp : AppModel = new AppModel();

    constructor(private http : HttpClient,private  cookieService : CookieService){

    }


    public getAppById(id : string,genreRequest : GenreRequest) : Promise<any>{
        return new Promise(
            (resolve,reject) => {
                var token = this.cookieService.get('token');

                const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);

                let params = new HttpParams();
                params = params.append('country',genreRequest.country);
                params = params.append('store',genreRequest.store);

                this.http.get(API_URLS.base_url + API_URLS.app_url+`/${id}`,{headers,params})
                .subscribe(
                    (res : any) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }


    getApps(app_ids : string [],genreRequest : GenreRequest) : Promise<any>{
        return new Promise(
            (resolve,reject) => {
                let apps: Promise<any>[] = [];
                app_ids.forEach(id => {
                    var app = this.getAppById(id,genreRequest);
                    apps.push(app);
                })
                resolve(apps);
            }
        );
    }
}