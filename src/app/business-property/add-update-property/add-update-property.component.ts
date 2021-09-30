import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { BusinessPropertyService } from 'src/app/Services/business-property.service';
import { BusinessPropertyModel } from 'src/app/Models/business-property.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
  
  updatedData: any;

  state$ : Observable<BusinessPropertyModel>

  property_Id : number = 0;
  constructor(private service:BusinessPropertyService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getProperty();
    // this.data = this.service.data;
    // this.service.data = undefined;
    // this.state$ = this.route.paramMap.pipe(map(() => window.history.state))
    // console.log(this.state$);
    this.router.getCurrentNavigation()?.extras.state;
    // {{debugger}}
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedData = history.state;
    console.log(this.updatedData);
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
      this.create_message="Property Business Was Added";
      this.service.getPropertyList();
      console.log(data);
      },
    err => {console.log(err);}
    );
  }

  update_message:string ="";
  updateProperty(property:BusinessPropertyModel) : void
  {
      // debugger;
      this.service.updateProperty(property).subscribe(data => {
      this.update_message = "Updated Property";
      this.service.getPropertyList();
      this.router.navigate(['/businessProperty']);
      console.log(data);
    })
  }

}
