import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean;
  agentName: string;
  
  constructor(private router: Router, private http: HttpClient) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    this.http.post("https://localhost:44354/api/Auth/login", credentials, {
      headers: new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      this.agentName = form.value.agentName;
      localStorage.setItem("jwt", token);
      localStorage.setItem("logInAgentName", this.agentName);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
