import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { BusinessPropertyModel } from '../Models/business-property.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessPropertyService {

  constructor(private http:HttpClient) { }

  ApiUrl:string ="https://localhost:44396/api/Consumer";

  getPropertyList():Observable<BusinessPropertyModel[]>
  {
    return this.http.get<BusinessPropertyModel[]>(this.ApiUrl + '/GetProperty/');
  }

  addProperty(property:BusinessPropertyModel):Observable<BusinessPropertyModel>{
    console.log(property);
    return this.http.post<BusinessPropertyModel>(this.ApiUrl + '/CreateProperty/',property,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  // https://localhost:44396/api/Consumer/UpdateProperty?PropertyId=3
  updateProperty(property:BusinessPropertyModel){
    // debugger;
    console.log(property);
    return this.http.put(this.ApiUrl+'/UpdateProperty?PropertyId='+property.propertyId, property,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  deleteProperty(propertyId:number){
    return this.http.delete(this.ApiUrl+'/DeleteProperty?PropertyId='+propertyId,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
    })
  });
  }

  getPropertyById(propertyId:number)
  {
    return this.http.get(this.ApiUrl + '/GetPropertyById?PropertyId=' + propertyId,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
    })
  });
}
}
