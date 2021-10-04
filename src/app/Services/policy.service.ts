import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Policy } from '../Models/policy.model';
import { Property } from '../Models/property.model';
import { Quote } from '../Models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http:HttpClient, private router:Router) { }

  // https://localhost:44366/api/Policy/ViewConsumerPolicyById?PolicyId=1
  readonly baseURL = 'https://localhost:44366/api/Policy';

  getPolicies():Observable<Policy[]>{
    return this.http.get<Policy[]>(this.baseURL + '/GetPolicies');
  }

  getProperties():Observable<Property[]>{
    return this.http.get<Property[]>(this.baseURL + '/GetProperties');
  }

  createPolicy(propertyId:string):Observable<string>{
    return this.http.post<string>(this.baseURL + '/CreatePolicy?PropertyId=' + propertyId, {
      headers:new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  issuePolicy(param : {policyid:string, paymentdetails:string}):Observable<string>{
    return this.http.put<string>(this.baseURL + '/IssuePolicy?PolicyId='+ param.policyid +'&PaymentDetails=' + param.paymentdetails, {
      headers:new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  viewPolicyByID(pid:string):Observable<Policy>{
    return this.http.get<Policy>(this.baseURL + '/ViewConsumerPolicyById?PolicyId='+pid);
  }

  getQuote(param : {bvalue:string, pvalue:string}):Observable<Quote> { 
      return this.http.get<Quote>(this.baseURL + '/GetQuote?BusinessValue='+ param.bvalue +'&PropertyValue=' + param.pvalue);
    }
}
