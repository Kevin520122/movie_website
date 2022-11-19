import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/header/header.component';


import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';



const routes: Routes = [
  { path: '', component: ProfileComponent }
];
@NgModule({
  imports: [
    CommonModule,
   
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //HeaderComponent,
    ProfileComponent
  ],
  exports: [RouterModule],
})
export class profileModule {}