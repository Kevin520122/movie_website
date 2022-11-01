import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { MovieItemComponent } from './pages/movie-item/movie-item.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { RegisterModule } from './pages/register/register.module';
import { MovielistModule } from './pages/movielist/movielist.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    //HeaderComponent,
    // HomeComponent,
    //RegisterComponent,
    //MovielistComponent,
    //MovieItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    RegisterModule,
    MovielistModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
