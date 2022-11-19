import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {
  movielist: any;
  trendlist: any;
  toplist: any;
  popularlist: any;
  pageNum: number = 1;
  constructor(public movieService: MoviesService) { }

  ngOnInit(): void {
    this.movieService.getMovies('top').subscribe((data) => {
      console.log(data);
      this.toplist = data;
    });

    this.movieService.getMovies('popular').subscribe((data) => {
      console.log(data);
      this.popularlist = data;
    });

    this.movieService.getMovies('trend').subscribe((data) => {
      console.log(data);
      this.trendlist = data;
    });

    this.movieService.getMovies('all', this.pageNum).subscribe(
      (data) => {
        console.log(data);
        this.movielist = data;
      }
    );
    
    
    // this.movieService.getMovies().subscribe((data) => {
    //   console.log(data);
    //   this.movielist = data;
    // })
  }

  onScroll(){
    this.movieService.getMovies("all", ++this.pageNum).subscribe((data) => {
      console.log(data);
      this.movielist.push(...data);
    })
  }

  

}
