import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, share, tap } from "rxjs";
import { API_URLS } from "./api_url_list";
import { GenreRankingModel } from "../Models/GenreRankingModel";

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

    private genreRankingCache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.genreRankingCache.size);
        console.log("Intercepting a request");
        if(req.method !== "GET"){
            return next.handle(req);
        }

        if(req.url.includes(API_URLS.genresRanking_url)){

            const cachedResponse = this.genreRankingCache.get(req);

            if(cachedResponse){
                console.log(`return of cached response`);
                return of(cachedResponse.clone());
            }
            
            return next.handle(req).pipe(
                tap((event : any) => {
                  if (event instanceof HttpResponse) {
                    console.log(`here we go`);
                    this.genreRankingCache.set(req, event);
                  }
                })
              );
        }

        return next.handle(req);
    }
    
}