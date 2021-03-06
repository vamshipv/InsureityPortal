import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  issueForm:IssuePolicyForm = new IssuePolicyForm();
  consumerName : string;
  policyPgNo:number = 1;

  constructor(private service:PolicyService) { }

  ngOnInit(): void {
    this.getPolicies();
  }

  searchPolicy(){
    if(this.consumerName == ""){
      this.ngOnInit();
    }
    else{
      this.policies = this.policies.filter(p => {
        return p.consumerName.toLocaleLowerCase().match(this.consumerName.toLocaleLowerCase());
      });
    }
  }

  key:string = '';
  reverse:boolean = false;
  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
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

  checkStatus(policyid:number): boolean{
    if(this.policyStatus=='Policy has been Issued for Policy ID '+ policyid)
    {
      return true;
    }
    return false;
  }

  issuePolicy(policyid:string, paymentdetails:string, issuePolicyForm:NgForm){
    const param = {policyid, paymentdetails};
    //issuePolicyForm.resetForm();
    this.service.issuePolicy(param).subscribe(
      data => {
        this.getPolicies();
        this.policyStatus = data;
      },
      err => {
        console.log(err);
      });

  }
  

}
