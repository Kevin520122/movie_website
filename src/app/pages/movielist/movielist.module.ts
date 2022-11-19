import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/header/header.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


import { SharedModule } from '../../shared/shared.module';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovielistComponent } from './movielist.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieRowComponent } from './movie-row/movie-row.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MovieDetailsResolver } from 'src/app/core/resolvers/movie-detail.resolve';
import { moviedetailsGuards } from 'src/app/core/guards/movieDetails.guard';
import { ProfileComponent } from '../profile/profile.component';


export const PositionKey = new InjectionToken<string>('');

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MovielistComponent },
      { 
        path: 'movie/:id/:name', 
        component: MovieDetailsComponent, 
        resolve: {
          movie: MovieDetailsResolver,
        },
        canActivate :[moviedetailsGuards] 
      },
      {
        path: 'movie/userProfile',
        component: ProfileComponent
      }
    ],
  },
];
@NgModule({
  providers: [moviedetailsGuards, [{ provide: PositionKey, useValue: 'movies' }],],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //HeaderComponent,
    MovielistComponent,
    MovieItemComponent,
    MovieDetailsComponent,
    MovieRowComponent,
    YoutubeComponent
  ],
  exports: [RouterModule],
})
export class MovielistModule {}