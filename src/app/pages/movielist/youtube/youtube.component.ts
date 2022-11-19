import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  playerConfig = {
    autoplay: 1,
  };

  constructor(public movieService: MoviesService) { }

  ngOnInit(): void {
    console.log(this.movieService.trailerKey)
  }

  goBack(){
    this.movieService.trailerClicked = false;
    document.body.style.overflow = 'auto';
  }

}
