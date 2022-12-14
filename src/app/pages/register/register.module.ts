import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from 'src/app/shared/header/header.component';


import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';



const routes: Routes = [
  { path: '', component: RegisterComponent }
];
@NgModule({
  imports: [
    CommonModule,
   
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    //HeaderComponent,
    RegisterComponent
  ],
  exports: [RouterModule],
})
export class RegisterModule {}