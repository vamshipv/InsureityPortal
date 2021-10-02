import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConsumerBusinessService } from 'src/app/Services/consumer-business.service';
import { ConsumerBusinessModel } from 'src/app/Models/consumer-business.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-business',
  templateUrl: './add-update-business.component.html',
  styleUrls: ['./add-update-business.component.css']
})
export class AddUpdateBusinessComponent implements OnInit {

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

  updatedbusinessData : any;

  constructor(private service:ConsumerBusinessService, public router: Router,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.getCurrentNavigation()?.extras.state;
    // {{debugger}}
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedbusinessData = history.state;
    console.log(this.updatedbusinessData);
  }

  getBusiness()
  {
    this.service.getBusinessList().subscribe(data => {
      this.businessList = data
      console.log(this.businessList);
    });
  }

  create_message: string ="";
  addBusiness(business:ConsumerBusinessModel) : void
  {
    // debugger;
    this.service.addBusiness(business).subscribe(data => 
      {
      this.create_message="Consumer Business was Added";
      this.service.getBusinessList();
      this.router.navigate(['/consumerBusiness']);
      console.log(data);
      },
    err => {console.log(err);}
    );
  }
  businessData : ConsumerBusinessModel;
  getData() : boolean {
    this.businessData = this.service.updateData;
    return true;
  }
  
  // update_Id:string | null= this.route.snapshot.paramMap.get('id');
  update_message:string ="";
  updateBusiness(business:ConsumerBusinessModel) : void
  {
      this.service.updateBusiness(business).subscribe(data => {
      this.update_message = "Updated Business";
      this.service.getBusinessList();
      this.router.navigate(['/consumerBusiness']);
      console.log(data);
    })
  }

}
