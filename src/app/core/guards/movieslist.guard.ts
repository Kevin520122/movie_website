import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/services/accounts/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
 
@Injectable()
export class movielistGuards implements CanActivate {
 
  constructor(
    private _router:Router, 
    public accountService: AccountService, 
    public authService: AuthService) {      
  }      
 
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
          //return true    
     //remove comments to return true 
     console.log(this.authService.isPass)
     const { jwtToken } = this.authService.userValue;
     console.log(jwtToken)
    if(jwtToken){
        return true;
    }     
     alert('The email or password is wrong!'); 
     this._router.navigate(["login"]);             
     return false;     
} }
 