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
import { debounceTime, map, Observable, of } from 'rxjs';
import { Roles } from 'src/app/services/interfaces/user.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  logo: string = "../assets/LOGO.png";
  emailList: string[] = [];
  registerForm!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  roles = Roles;
  
  get name(): FormControl{
    return this.registerForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  } 

  get pwd(): FormGroup {
    return this.registerForm.get('pwd') as FormGroup;
  }

  get userroles(): FormGroup {
    return this.registerForm.get('userroles') as FormGroup;
  }
  constructor(private fb: FormBuilder, private http: HttpClient, public accountService: AccountService) { }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required], [this.asyncCheckEmail]],
      pwd: this.fb.group(
        {
          password: ['', [this.minlen(5)]],
          confirm: [''],
        },
        {
          validators: [this.matchPwd],
        }
      ),
      userroles: this.fb.group(
        {
          role: ['', [Validators.required]],
        },
        {
          validators: [],
        }
      )
    });
  }

  onSubmit(){
    console.log(this.registerForm.value);
    this.accountService.accountlist.push({
      email: this.registerForm.value.email,
      username: this.registerForm.value.name,
      password: this.registerForm.value.pwd.password,
      role: this.registerForm.value.userroles.role,
      isLogin: false
    })
    console.log(this.accountService.accountlist)
    // of(this.accountService.accountlist).subscribe((accounts) => {
    //   console.log(accounts)
    // })
  }

  private asyncCheckEmail = (
    control: FormControl
  ): ValidationErrors | null => {
    const url = 'http://localhost:4231/auth/check-email';
    const value: string = control.value;
    return of(value).pipe(
      debounceTime(500),
      map((value) => {
        let res;
        let flag = false;
        this.accountService.accountlist.forEach((account) => {
            if(account.email === value){
              res = { hasemail: true };
              flag = true;
            }
        })
        if(!flag){res =  null;}
        return res
        
      })
    )


    // if(this.accountService.accountlist.includes(value)){
    //   return { hasemail: true };
    // }else{
    //   return null;
    // }

    // return this.http.post(url, { email: value }).pipe(
    //   debounceTime(500),
    //   map((data: any) => {
    //     if (data) {
    //       return { hasemail: true };
    //     }
    //     return null;
    //   })
    // );
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
