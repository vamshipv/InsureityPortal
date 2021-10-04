import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PolicyService } from 'src/app/Services/policy.service';
import { Policy } from '../Models/policy.model';
import { Property } from '../Models/property.model';

export class CreatePolicy{
  propertyid:number;
}

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.css']
})
export class CreatePolicyComponent implements OnInit {

  policyStatus:string = 'Policy Status is displayed here';
  policies:Policy[];
  properties:Property[];
  createPolicyForm:CreatePolicy = new CreatePolicy();
  consumerName : string;
  key:string = '';
  reverse:boolean = false;
  policyPgNo:number = 1;
  propertyPgNo:number = 1;

  constructor(public service:PolicyService) { }

  ngOnInit(): void {
    this.getProperties();
    this.getPolicies();
  }

  searchPolicyProperty(){
    if(this.consumerName == ""){
      this.ngOnInit()
    }
    else{
      this.policies = this.policies.filter(p => {
        return p.consumerName.toLocaleLowerCase().match(this.consumerName.toLocaleLowerCase());
      });
      this.properties = this.properties.filter(p => {
        return p.consumerName.toLocaleLowerCase().match(this.consumerName.toLocaleLowerCase());
      });
    }
  }

  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  checkPolicyStatus(myPolicyStatus:string):boolean{
    return myPolicyStatus === "Policy has been created with Policy Status \'Initiated\'";
  }

  getProperties(){
    this.service.getProperties().subscribe(
      data => {
        this.properties = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPolicies(){
    this.service.getPolicies().subscribe(
      data => {
        this.policies = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  createPolicy(pstatus:string, policyform:NgForm){  //param : {
    this.service.createPolicy(pstatus).subscribe(
      data => {
        this.getPolicies();
        this.getProperties();
        this.policyStatus = data;
        policyform.resetForm();
      },
      err => {
        console.log(err);
      }
    )};
}
