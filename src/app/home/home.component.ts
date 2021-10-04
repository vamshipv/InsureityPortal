import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  agentName:string | null;
  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  ngOnInit(): void {
  }

  isUserAuthenticated() {
    const token : string | null = localStorage.getItem("jwt");
    this.agentName = localStorage.getItem("agentName");
    if (token && !this.jwtHelper.isTokenExpired(token) && token != null) {
      // console.log("wokrk");
      return true;
    }
    else {
      // console.log("not wokrk");
      return false;
    }
  }

}
