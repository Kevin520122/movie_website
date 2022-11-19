import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/services/accounts/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
 
@Injectable()
export class moviedetailsGuards implements CanActivate {
 
  constructor(private _router:Router, public accountService: AccountService, public authService: AuthService) {      
  }      
 
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      console.log("canActivate");      //return true    
     //remove comments to return true 
    if(this.authService.userValue.role !== "USER"){
        return true;
    }     
     alert('You are not allowed to view this page if you are not a Admin or Super user!'); 
     this._router.navigate(["movies"]);             
     return false;     
} }