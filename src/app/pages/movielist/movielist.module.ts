import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


import { SharedModule } from '../../shared/shared.module';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { MovielistComponent } from './movielist.component';



const routes: Routes = [
  { path: 'movies', component: MovielistComponent }
];
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //HeaderComponent,
    MovielistComponent,
    MovieItemComponent
  ],
})
export class MovielistModule {}