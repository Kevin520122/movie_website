import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent}, 
  // {path: 'movies', component: MovielistComponent}
  {path: "pages", loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: "pages", loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
  {path: "pages", loadChildren: () => import('./pages/movielist/movielist.module').then(m => m.MovielistModule)},
  {path: "pages", loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
