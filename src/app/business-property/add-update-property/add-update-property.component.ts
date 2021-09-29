import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BusinessPropertyService } from 'src/app/Services/business-property.service';
import { BusinessPropertyModel } from 'src/app/Models/business-property.model';

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

  property_Id : number = 0;
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

  create_message: string ="";
  addProperty(property:BusinessPropertyModel) : void
  {
    this.service.addProperty(property).subscribe(data => 
      {
      this.create_message="created with PropertyId" + property.propertyId;
      this.service.getPropertyList();
      console.log(data);
      },
    err => {console.log(err);}
    );
  }

  update_message:string ="";
  updateProperty(propertyId:number,property:BusinessPropertyModel) : void
  {
      this.service.updateProperty(propertyId,property).subscribe(data => {
      this.update_message = "Updated Property";
      this.service.getPropertyList();
      console.log(data);
    })
  }

}
