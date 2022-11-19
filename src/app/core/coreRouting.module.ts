import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../pages/profile/profile.component';
import { movielistGuards } from './guards/movieslist.guard';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent}, 
  // {path: 'movies', component: MovielistComponent}
  {path: "", loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)},
  {path: "register", loadChildren: () => import('../pages/register/register.module').then(m => m.RegisterModule)},
  {
    path: "movies", 
    loadChildren: () => import('../pages/movielist/movielist.module').then(m => m.MovielistModule),
    // canActivate :[movielistGuards] 
  },
  {path: "login", loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule)},
  {
    path: 'userProfile',
    component: ProfileComponent
  }
];

@NgModule({
  providers: [movielistGuards],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
