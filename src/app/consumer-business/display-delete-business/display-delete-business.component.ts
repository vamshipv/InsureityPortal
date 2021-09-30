import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConsumerBusinessModel } from 'src/app/Models/consumer-business.model';
import { ConsumerBusinessService } from 'src/app/Services/consumer-business.service';

@Component({
  selector: 'app-display-delete-business',
  templateUrl: './display-delete-business.component.html',
  styleUrls: ['./display-delete-business.component.css']
})
export class DisplayDeleteBusinessComponent implements OnInit {

  businessList : ConsumerBusinessModel[] = [];

  businessModel:ConsumerBusinessModel ={
    businessId: 0,
    businessName: "",
    businessType: "",
    totalEmployees: 0,
    businessMasterId: 0,
    consumerId: 0,
    "businessMaster": {
      businessMasterId: 0,
      businessValue: 0,
      businessTurnOver: 0,
      capitalInvest: 0
    }
  };


  constructor(private service:ConsumerBusinessService, public router: Router) { }

  ngOnInit(): void {
    this.getBusiness();
  }


  getBusiness()
  {
    this.service.getBusinessList().subscribe(data => {
      this.businessList = data
      console.log(this.businessList);
    });
  }

  delete_mesaage :string =""
  deleteBusiness(businessId:number) : void
  {
    this.service.deleteBusiness(businessId).subscribe(data =>
      {
        alert("Business ID" +  " " + businessId.toString()+ " " + "Deleted")
        this.service.getBusinessList();
        this.delete_mesaage = "Deleted Business" + businessId;
        console.log(data);
      })
  }

  addClick()
  {
    this.router.navigate(['addBusiness/BusinessId/0']);
  }

  
  editClick(business:ConsumerBusinessModel) : void
  {
    this.router.navigateByUrl('/updateBusiness/', {state: { business } });
    console.log(business);
  }
}
