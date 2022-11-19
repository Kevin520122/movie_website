import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-movie-row',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.scss']
})
export class MovieRowComponent implements OnInit {
  @Input() movies: any;
  @ViewChild('row') movierow!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log(this.movies)
  }

  scrollRight() {
    this.movierow.nativeElement.scrollTo({
      left: this.movierow.nativeElement.scrollLeft + 1500,
      behavior: 'smooth',
    });
  }

  scrollLeft() {
    this.movierow.nativeElement.scrollTo({
      left: this.movierow.nativeElement.scrollLeft - 1500,
      behavior: 'smooth',
    });
  }

}
