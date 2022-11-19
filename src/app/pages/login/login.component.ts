import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, map, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/accounts/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo: string = "../assets/LOGO.png";
  loginForm!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  @ViewChild('pwdInput') pwdinput!: ElementRef<any>
  @ViewChild('emailInput') emailinput!: ElementRef<any>
  

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  } 

  get pwd(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  } 
  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    public accountService: AccountService,
    public authService: AuthService
    ) { 
    
  }
  
  ngOnInit(): void {
    this.authService.isPass = false
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required], , [this.asyncCheckEmail]],
      pwd: ['', [Validators.required], [this.asyncCheckPassword]],
    });
    // this.pwdinput.nativeElement.value ="";
    // this.emailinput.nativeElement.value = "";
  }
  onSubmit(){
    //this.accountService.findCurUser(this.loginForm.value)
    //console.log(this.accountService.curUser)

    const loginInfo = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.pwd
    }
    this.email.reset("");
    this.pwd.reset("")
    this.authService.login(loginInfo).subscribe((res) => {
      this.authService.isPass = true
    });
    
    //Once auth serviec done, comment out
    //this.authService.login(this.loginForm.value)
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



