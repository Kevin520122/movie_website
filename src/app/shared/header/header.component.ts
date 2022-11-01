import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogIn: boolean = false;
  logo: string = "../assets/LOGO.png";
  userName: string = "kevin";
  constructor() { }

  ngOnInit(): void {
  }

}
