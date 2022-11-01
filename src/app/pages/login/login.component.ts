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
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  private asyncCheckEmail = (
    control: FormControl
  ): Observable<ValidationErrors | null> => {
    const url = 'http://localhost:4231/auth/check-email';
    const value: string = control.value;

    return this.http.post(url, { email: value }).pipe(
      debounceTime(500),
      map((data: any) => {
        if (data) {
          return { hasemail: true };
        }
        return null;
      })
    );
  };

  private minlen(limitednum: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      if (control.value.length < limitednum) {
        return {
          minlen: true,
          requiredLength: limitednum,
        };
      }
      return null;
    };
  }

  private matchPwd = (group: FormGroup): ValidationErrors | null => {
    const pwdval = group.get('password')?.value;
    const cfmval = group.get('confirm')?.value;

    if (pwdval !== cfmval) {
      return { [this.pwdNotMatch]: true };
    }
    return null;
  };

}




interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

interface AsyncValidatorFn {
  (control: AbstractControl):
    | Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null>;
}


