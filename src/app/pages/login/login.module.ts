import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/header/header.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


import { SharedModule } from '../../shared/shared.module';
import { MovieItemComponent } from '../movielist/movie-item/movie-item.component';
import {LoginComponent } from './login.component';



const routes: Routes = [
  { path: '', component: LoginComponent }
  
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //HeaderComponent,
    LoginComponent,
  ],
  exports: [RouterModule],
})
export class LoginModule {}