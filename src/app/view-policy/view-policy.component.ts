import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/Models/policy.model';
import { PolicyService } from 'src/app/Services/policy.service';

export class ViewPolicyForm{
  policyid:number;
}

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent implements OnInit {
  ViewPolicyData:Policy;// = new ViewPolicy();
  EmptyPSData:Policy;
  policyform:ViewPolicyForm = new ViewPolicyForm();
  nopolicy:string;

  constructor(public service:PolicyService) { }

  ngOnInit(): void {
  }

  isNotEmptyPolicy(val: any):boolean{
    return val !== this.EmptyPSData || val != null; // typeof val !== 'string';
  }

  viewPolicy(pid:string){
    this.service.viewPolicyByID(pid).subscribe(
      data => {
        if(data == null){
          this.ViewPolicyData = this.EmptyPSData;
          this.nopolicy = "No Policy Found"; 
        }
        else{
          this.ViewPolicyData = data;
        }
      },
      err => {
        console.log(err);
      }
    )
  }  

}
