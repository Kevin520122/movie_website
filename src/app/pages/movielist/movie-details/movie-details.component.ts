import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  constructor(private activatedRoute: ActivatedRoute,
    public movieService: MoviesService) { }

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((data) => {
    //   this.movieService.getMovie(String(data.get('id'))).subscribe((data) => {
    //     this.movie = data
    //   });
    // });
    this.movie = this.activatedRoute.snapshot.data['movie']
  }

  showVideo(key: string) {
    this.movieService.trailerKey = key;
    setTimeout(() => {
      this.movieService.trailerClicked = true;
      if (this.movieService.trailerKey && this.movieService.trailerClicked) {
        document.body.style.overflow = 'hidden';
      }
    }, 0);
  }

}
