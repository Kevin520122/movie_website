import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogIn: boolean = false;
  logo: string = "../assets/LOGO.png";
  userName: string = "kevin";

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {}

  onLogOut(){
    this.accountService.curUser = {isLogin: false};
  }

}
