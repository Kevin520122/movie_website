import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, map, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo: string = "../assets/LOGO.png";
  loginForm!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  } 

  get pwd(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  } 
  constructor(private fb: FormBuilder, private http: HttpClient, public accountService: AccountService) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required], , [this.asyncCheckEmail]],
      pwd: ['', [Validators.required], [this.asyncCheckPassword]],
    });
  }
  onSubmit(){
    this.accountService.findCurUser(this.loginForm.value)
    console.log(this.accountService.curUser)
  }

  private asyncCheckEmail = async (control: FormControl) => {
    if (this.accountService.checkEmail(control.value)) {
      return { valid: true};
    }
    return { valid: false };
  };

  private asyncCheckPassword = async (control: FormControl) => {
    if (this.accountService.checkPassword(this.email.value, control.value)) {
      return {
        valid: true,
      };
    }
    return { valid: false };
  };

  

  

}



