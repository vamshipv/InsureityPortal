import { Component, OnInit } from '@angular/core';
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
  createpolicyform:CreatePolicy = new CreatePolicy();

  constructor(public service:PolicyService) { }

  ngOnInit(): void {
    this.listOfProperties();
    this.listOfPolicies();
  }

  checkPolicyStatus(myPolicyStatus:string):boolean{
    return myPolicyStatus === "Policy has been created with Policy Status \'Initiated\'";
  }

  listOfProperties(){
    this.service.listOfProperties().subscribe(
      data => {
        this.properties = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  listOfPolicies(){
    this.service.listOfPolicies().subscribe(
      data => {
        this.policies = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  createPolicy(pstatus:string){  //param : {
    this.service.createPolicy(pstatus).subscribe(
      data => {
        this.listOfPolicies();
        this.listOfProperties();
        this.policyStatus = data;
      },
      err => {
        console.log(err);
      }
    )};
}
