import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces/user.interface';
// import * as bcrypt from 'bcrypt';
// import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountlist: any[] = [];
  curUser: User = {isLogin: false}
  constructor(public authService: AuthService) { 
    this.authService.getUsers().subscribe((userInfo) => {
      this.accountlist = userInfo
      console.log(this.accountlist)
    } )
  }

  checkEmail(email: string) {
    let check = false;
    this.accountlist.forEach((user): any => {
      if (user.email === email) {
        check = true;
      }
    });
    return check;
  }

  // async hashCheck(pwd: string, inputPwd: string){
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(inputPwd, salt);
  //   console.log(hashedPassword)
  //   return pwd === hashedPassword
  // }
  checkPassword(email: string, pwd: any) {
    let check = false;
    this.accountlist.forEach((user) => {
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
    this.accountlist.forEach(async (user): Promise<any> => {
      if (user.email === data.email) {
        if (user.password === data.pwd) {

         this.curUser.isLogin = true;
        }
      }
    });
    // this.authService.users$.subscribe((users) => {
    //   console.log(users)
    //   users.forEach((user: any) => {
    //       if (user.email === data.email) {
    //         if (user.password === data.pwd) {
    //          this.curUser = user;
    //          this.curUser.isLogin = true;
    //         }
    //       }
    //     });
    // })


  }

}
