import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private readonly baseURL = "https://api.themoviedb.org/3/movie/popular";
  movie_id : number = 2;
  private readonly queryStr = "?api_key=";
  private readonly API_Key = "b52a76fb28743ef083d3aaca7d631578";
  private readonly img_prefix = "https://image.tmdb.org/t/p/w500"

  /* movies */
  private movies = [];
  private movies$ = new BehaviorSubject<any>(this.movies);
  movielist$ = this.movies$.asObservable();

  constructor(private readonly http: HttpClient) { }

  //Randomly generate movie id
  generate_movie_id(){
    const max = 700;
    const min = 400;
    let num = Math.random() * (max - min) + min;
    return num + ""
  }

  //Get 20 movies each time
  getMovies(){
    // let reqs = [];
    // for(let i = 0; i < 20; i++){
    //   const URL = this.baseURL + this.generate_movie_id() + this.queryStr + this.API_Key;
    //   let req = this.http.get<any>(URL)

    //   reqs.push(req)
    // }

    // return forkJoin(reqs)

    return this.http.get<any>(this.baseURL + this.queryStr + this.API_Key).pipe(
      map((data: any) => {
        return data.results.map((movie: any) => {
            return {
              img: this.img_prefix + movie.backdrop_path,
              language: movie.original_language,
              title: movie.original_title,
              overview: movie.overview,
              rate: movie.vote_average
            }
        })
      })
    )
  }
}
