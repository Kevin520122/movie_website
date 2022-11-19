import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoreRoutingModule } from '../core/coreRouting.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ HeaderComponent],
  imports: [ CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ]
})
export class SharedModule { }
