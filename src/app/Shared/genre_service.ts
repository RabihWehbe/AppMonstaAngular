import { Injectable } from "@angular/core";
import { GenreRankingModel } from "../Models/GenreRankingModel";
import { GenreRequest } from "../Models/GenreRequest";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { API_URLS } from "./api_url_list";
import { GenreModel } from "../Models/GenreModel";

@Injectable({
    providedIn: "root"
})
export class GenresService{
    
    public genreRankings : GenreRankingModel[] = [];

    public genres : GenreModel[] = [];

    public selectedGenre : GenreModel = new GenreModel();

    constructor(private http : HttpClient,private cookieService : CookieService){
    }

    getGenreRankings(genreRequest : GenreRequest) : Promise<any>{
        return new Promise(
            (resolve,reject) => {
                var token = this.cookieService.get('token');

                const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);

                let params = new HttpParams();

                params = params.append('store',genreRequest.store);
                params = params.append('date',genreRequest.date);
                
                this.http.get(API_URLS.base_url + API_URLS.genresRanking_url,{headers,params}).subscribe(
                    (res : any)=>{
                        this.genreRankings = res;
                        resolve(this.genreRankings);
                    },
                    (error)=>{
                        resolve(error.error)
                    }
                );
            }
        );
    }


    async getGenres(genreRequest : GenreRequest) : Promise<any>{
        return new Promise(
            async (resolve,reject) => {
                var token = this.cookieService.get('token');

                const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);

                let params = new HttpParams();

                params = params.append('store',genreRequest.store);
                params = params.append('date',genreRequest.date);
                params = params.append('country',genreRequest.country);

                try {
                    await this.getGenreRankings(genreRequest); 
                    console.log(`genre rankings length: ${this.genreRankings.length}`)  
                } catch (error) {
                    reject(error);
                }

                this.http.get(API_URLS.base_url + API_URLS.aggregatedGenres_url,{params,headers})
                .subscribe(
                    (res : any) =>{
                        res.forEach((element : any) => {
                             var genre = new GenreModel();
                             genre.country = element['country'];
                             genre.genre_id = element['genre_id'];
                             genre.rank_id = element['rank_id'];
                             genre.ranks = element['ranks'];

                             const genreRanking = this.genreRankings.find((m) => m.genre_id == genre.genre_id);

                             if(genreRanking){
                                genre.genre_name = genreRanking.name;
                             }
                             else{
                                genre.genre_name = "";
                             }
                            this.genres.push(genre); 
                        });
                        resolve(this.genres);
                    },
                    (error)=>{
                        reject(error.error);
                    }
                )

            }
        );
    }

}