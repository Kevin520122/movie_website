import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, from, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private baseURL = "";
  movie_id : number = 2;

  trailerKey: string = '';
  trailerClicked: boolean = false;

  private readonly queryStr = "?api_key=";
  private readonly API_Key = "b52a76fb28743ef083d3aaca7d631578";
  private readonly img_prefix = "https://image.tmdb.org/t/p/w500";
  private readonly videoQuery =  `/videos?api_key=${this.API_Key}`;

  private readonly baseAPI = "https://api.themoviedb.org/3/movie/";
  private readonly popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_Key}&language=en-US&page=`;
  private readonly trendingAPI = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.API_Key}&page=`;
  private readonly discovrAPI = `https://api.themoviedb.org/3/discover/movie?api_key=${this.API_Key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
  private readonly topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_Key}&page=`;
  
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
  getMovies(type: string, numPage: number = 1){
    // let reqs = [];
    // for(let i = 0; i < 20; i++){
    //   const URL = this.baseURL + this.generate_movie_id() + this.queryStr + this.API_Key;
    //   let req = this.http.get<any>(URL)

    //   reqs.push(req)
    // }

    // return forkJoin(reqs)
    if(type === 'all') this.baseURL = this.discovrAPI
    else if(type === 'trend') this.baseURL = this.trendingAPI
    else if(type === 'top') this.baseURL = this.topRatedAPI
    else if(type === 'popular') this.baseURL = this.popularAPI

    return this.http.get<any>(this.baseURL + String(numPage)).pipe(
      map((data: any) => {
        return data.results.map((movie: any) => {
            let res = {
              img: this.img_prefix + movie.backdrop_path,
              language: movie.original_language,
              title: movie.original_title,
              overview: movie.overview,
              rate: movie.vote_average.toFixed(1),
              id: movie.id,
              trailerKey: ''
            };
            if (type !== 'trend') {
            this.getTrailer(String(movie.id)).subscribe((data: any) => {
              data.subscribe((item: any) => {
                item.results.forEach((trail: any) => {
                  if (trail.type === 'Trailer') {
                    res.trailerKey = trail.key;
                  }
                });
              });
            })
          };

          return res


        })
      })
    )
  }

  getMovie(id: string){
    return this.http.get<any>(this.baseAPI + id + this.queryStr + this.API_Key)
      .pipe(
        map((movie: any) => {
          const res = {
            id: movie.id,
            backdrop_path: this.img_prefix + movie.backdrop_path,
            image: this.img_prefix + movie.poster_path,
            name: movie.original_title.toLowerCase(),
            release_date: movie.release_date ? movie.release_date : 'null',
            original_language: movie.original_language,
            genres: movie.genres,
            runtime: String(movie.runtime),
            vote_average: movie.vote_average.toFixed(1),
            vote_count: movie.vote_count,
            trailerKey: '',
            overview: movie.overview,
            watch: '',
          };

          this.getTrailer(String(movie.id)).subscribe((data: any) => {
            data.subscribe((item: any) => {
              item.results.forEach((trail: any) => {
                if (trail.type === 'Trailer') {
                 res.trailerKey = trail.key;
                }
              });
            });
          });
          return res
        })
    )
  }

  getTrailer(id: string) {
    return this.http.get<any>(this.baseAPI + id + this.videoQuery).pipe(
      switchMap(async (value) => {
        let obs1$ = from([value]);

        return obs1$.pipe(
          map((value) => {
            if (!value) {
              throw new Error('cannot get');
            }
            return value;
          }),
          catchError((error) => {
            let obs2$ = of(error);
            return obs2$;
          })
        );
      })
    );
  }
}
