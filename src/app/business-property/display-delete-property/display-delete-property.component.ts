import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BusinessPropertyService } from 'src/app/Services/business-property.service';
import { BusinessPropertyModel } from 'src/app/Models/business-property.model';

@Component({
  selector: 'app-display-delete-property',
  templateUrl: './display-delete-property.component.html',
  styleUrls: ['./display-delete-property.component.css']
})
export class DisplayDeletePropertyComponent implements OnInit {

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

  deletePropertyId = 0;
  property_Id : number = 0;
  businessPropertyPgNo:number = 1;
  constructor(private service:BusinessPropertyService, public router: Router) { }

  ngOnInit(): void {
    this.getProperty();
  }

  getProperty()
  {
    this.service.getPropertyList().subscribe(data => {
      this.propertyList = data
      console.log(this.propertyList);
    });
  }

  delete_message:string="";
  deleteProperty(businessId:number) : void
  {
    this.service.deleteProperty(businessId).subscribe(data =>
      {
        this.router.navigateByUrl('/businessProperty/');
        this.getProperty();
        this.delete_message = "Deleted Business" + businessId;
        console.log(data);
      })
  }

  addClick()
  {
    this.router.navigate(['/addProperty/PropertyId/0']);
  }

  editClick(property:BusinessPropertyModel) : void
  {
    this.router.navigateByUrl('/updateProperty/', {state: { property } });
    console.log(property);
  }
}
