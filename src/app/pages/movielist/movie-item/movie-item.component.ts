import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../services/interfaces/movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;
  
  constructor(private router: Router) { }

  ngOnInit(): void {}

  movieDetails(){
    this.router.navigate([
      '/movies/movie',
      this.movie.id,
      this.movie.title.split(' ').join('-'),
    ], {
      state: { id: this.movie.id },
    });
  }

}
