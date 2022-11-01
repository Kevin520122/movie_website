import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {
  movielist: any;
  constructor(public movieService: MoviesService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      console.log(data);
      this.movielist = data;
    })
  }

  onScroll(){
    this.movieService.getMovies().subscribe((data) => {
      console.log(data);
      this.movielist.push(...data);
    })
  }

}
