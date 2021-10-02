import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Insureity Portal';

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  isUserAuthenticated() {
    const token : string | null = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token) && token != null) {
      // console.log("wokrk");
      return true;
    }
    else {
      // console.log("not wokrk");
      return false;
    }
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }

}
