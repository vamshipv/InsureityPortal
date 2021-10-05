import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConsumerBusinessService } from 'src/app/Services/consumer-business.service';
import { ConsumerBusinessModel } from 'src/app/Models/consumer-business.model';
import { ActivatedRoute } from '@angular/router';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { ConsumerModel } from 'src/app/Models/consumer.model';
import { BusinessMaster } from 'src/app/Models/business-master.Model';
import { data } from 'autoprefixer';
import { NgForm } from '@angular/forms';

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

  businessMasterList : BusinessMaster[] = [];

  businessMaster: BusinessMaster = {
    businessMasterId: 0,
      businessValue: 0,
      businessTurnOver: 0,
      capitalInvest: 0
  }

  updatedbusinessData : any;

  ConsumerList:ConsumerModel[] = [];
  consumerModel:ConsumerModel ={
    consumerId:0,
    consumerName:"",
    dateOfBirth: new Date(),
    email:"",
    panNumber:"",
    agentId:0,
  };

  constructor(private service:ConsumerBusinessService, public router: Router,
    public route:ActivatedRoute,private serviceConsumer:ConsumerService) { }

  ngOnInit(): void {
    this.router.getCurrentNavigation()?.extras.state;
    // {{debugger}}
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedbusinessData = history.state;
    console.log(this.updatedbusinessData);
    this.getBusiness();
    this.getConsumer();
    this.getBusinessMaster();
  }

  getBusinessMaster()
  {
    this.serviceConsumer.getBusinessMaster().subscribe(data => {
      this.businessMasterList = data;
    });
  }

  getConsumer()
  {
    this.serviceConsumer.getConsumerList().subscribe(data => {
      this.ConsumerList = data
      console.log(this.ConsumerList);
    });
  }

  getBusiness()
  {
    this.service.getBusinessList().subscribe(data => {
      this.businessList = data
      console.log(this.businessList);
    });
  }

  errorMessage = [] = "";
  create_message: string ="";
  addBusiness(business:ConsumerBusinessModel,businessrForm:NgForm) : void
  {
    this.service.addBusiness(business).subscribe(data => 
      {
      this.create_message="Consumer Business was Added";
      this.service.getBusinessList();
      console.log(data);
      businessrForm.resetForm();
      },
        err => {
          this.errorMessage = err.error;
          ;
        } 
    );
  }
  businessData : ConsumerBusinessModel;
  getData() : boolean {
    this.businessData = this.service.updateData;
    return true;
  }
  
  update_message:string ="";
  updateBusiness(business:ConsumerBusinessModel) : void
  {
      this.service.updateBusiness(business).subscribe(data => {
      this.update_message = "Updated Business";
      this.service.getBusinessList();
      console.log(data);
    },
      err => {
        this.errorMessage = err.error;
        ;
      } 
  );
  }
}
