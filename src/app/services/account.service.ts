import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountlist: User[] = [];
  curUser: User = {isLogin: false}
  constructor() { }

  checkEmail(email: string) {
    let check = false;
    this.accountlist.forEach((user): any => {
      if (user.email === email) {
        check = true;
      }
    });
    return check;
  }

  checkPassword(email: string, pwd: any) {
    let check = false;
    this.accountlist.forEach((user): any => {
      if (user.email === email) {
        if (user.password === pwd) {
          check = true;
        }
      }
    });
    return check;
  }

  isMatch(data: any){
    let check = false;
    this.accountlist.forEach((user): any => {
      if (user.email === data.email) {
        if (user.password === data.pwd) {
          check = true;
        }
      }
    });
    return check;
  }

  findCurUser(data: any){
    this.accountlist.forEach((user): any => {
      if (user.email === data.email) {
        if (user.password === data.pwd) {
         this.curUser = user;
         this.curUser.isLogin = true;
        }
      }
    });

  }

}
