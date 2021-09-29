import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/Models/policy.model';
import { PolicyService } from 'src/app/Services/policy.service';

export class IssuePolicyForm{
  policyid:number;
  paymentdetail:string;
}

@Component({
  selector: 'app-issue-policy',
  templateUrl: './issue-policy.component.html',
  styleUrls: ['./issue-policy.component.css']
})
export class IssuePolicyComponent implements OnInit {

  policyStatus:string = 'Policy Status is displayed here';
  policies:Policy[];
  issueform:IssuePolicyForm = new IssuePolicyForm();

  constructor(private service:PolicyService) { }

  ngOnInit(): void {
    this.listOfPolicies();
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

  issuePolicy(policyid:string, paymentdetails:string){
    const param = {policyid, paymentdetails};
    this.service.issuePolicy(param).subscribe(
      data => {
        // this.service.redirectTo("issuepolicy");
        this.listOfPolicies();
        this.policyStatus = data;
      },
      err => {
        console.log(err);
      });
  }
  

}
