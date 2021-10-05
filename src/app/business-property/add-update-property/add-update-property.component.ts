import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { BusinessPropertyService } from 'src/app/Services/business-property.service';
import { BusinessPropertyModel } from 'src/app/Models/business-property.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsumerBusinessService } from 'src/app/Services/consumer-business.service';
import { ConsumerBusinessModel } from 'src/app/Models/consumer-business.model';
import { BusinessMaster } from 'src/app/Models/business-master.Model';
import { PropertyMaster } from 'src/app/Models/property-master.Model';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-update-property',
  templateUrl: './add-update-property.component.html',
  styleUrls: ['./add-update-property.component.css']
})
export class AddUpdatePropertyComponent implements OnInit {

  propertyList : BusinessPropertyModel[] =[];

  propertyModel:BusinessPropertyModel = {
    propertyId: 0,
    buildingType: "",
    buildingStoreys: 0,
    buildingAge: 0,
    businessId: 0,
    propertyMasterId: 0,
    propertyMaster: {
      propertyMasterId: 0,
      costOfAssest: 0,
      salvageValue: 0,
      usefulLifeOfAssest: 0,
      propertyValue: 0,
    }
  };
  
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

  propertyMasterList : PropertyMaster[] =[];

  propertyMaster : PropertyMaster = {
    propertyMasterId: 0,
    costOfAssest: 0,
    salvageValue: 0,
    usefulLifeOfAssest: 0,
    propertyValue: 0,
  }

  updatedData: any;

  state$ : Observable<BusinessPropertyModel>

  property_Id : number = 0;
  constructor(private service:BusinessPropertyService, public router: Router, 
    public route: ActivatedRoute, private serviceBusiness:ConsumerBusinessService, private serviceConsumer:ConsumerService) { }

  ngOnInit(): void {
    this.getProperty();
    this.getBusiness();
    this.getpropertyMasterList();
    this.router.getCurrentNavigation()?.extras.state;
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedData = history.state;
    console.log(this.updatedData);
  }

  getBusiness()
  {
    this.serviceBusiness.getBusinessList().subscribe(data => {
      this.businessList = data;
      console.log(this.businessList);
    });
  }

  getProperty()
  {
    this.service.getPropertyList().subscribe(data => {
      this.propertyList = data
      console.log(this.propertyList);
    });
  }

  getpropertyMasterList()
  {
    this.serviceConsumer.getPropertyMaster().subscribe(data => {
      this.propertyMasterList = data
      console.log(this.propertyMasterList);
    });
  }

  create_message: string ="";
  errorMessage = [] = "";
  addProperty(property:BusinessPropertyModel,propertyForm:NgForm) : void
  {
    this.service.addProperty(property).subscribe(data => 
      {
      this.create_message="Property Business Was Added";
      this.service.getPropertyList();
      console.log(data);
      propertyForm.resetForm();
      },
      err => {
        this.errorMessage = err.error;
        ;
      } 
    );
  }

  update_message:string ="";
  updateProperty(property:BusinessPropertyModel) : void
  {
      this.service.updateProperty(property).subscribe(data => {
      this.update_message = "Updated Property";
      this.service.getPropertyList();
      console.log(data);
    },
      err => {
        this.errorMessage = err.error;
        ;
      } 
    );
  }

}
