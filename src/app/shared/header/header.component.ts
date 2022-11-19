import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/accounts/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogIn: boolean = false;
  logo: string = "../assets/LOGO.png";
  userName: string = "kevin";
  isClickSetting: boolean = false
  settings = [
    {value: "Change Role"}
  ]

  constructor(public accountService: AccountService, public authService: AuthService) { }

  ngOnInit(): void {}

  onLogOut(){
    this.accountService.curUser = {isLogin: false};
  }

  onToggle(){
    this.isClickSetting = !this.isClickSetting;
  }

}
