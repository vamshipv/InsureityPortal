import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConsumerBusinessModel } from '../Models/consumer-business.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerBusinessService {

  constructor(private http:HttpClient) { }

  ApiUrl:string ="https://localhost:44396/api/Consumer";

  updateData : ConsumerBusinessModel;

  getBusinessList():Observable<ConsumerBusinessModel[]>
  {
    return this.http.get<ConsumerBusinessModel[]>(this.ApiUrl + '/GetBusiness/');
  }

  addBusiness(business:ConsumerBusinessModel):Observable<ConsumerBusinessModel>{
    console.log(business);
    return this.http.post<ConsumerBusinessModel>(this.ApiUrl + '/CreateBusiness/',business,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  // https://localhost:44396/api/Consumer/UpdateBusiness?BusinessId=1
  updateBusiness(business:ConsumerBusinessModel){
    console.log(business);
    return this.http.put(this.ApiUrl+'/UpdateBusiness?BusinessId='+business.businessId,business,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  deleteBusiness(businessId:number){
    return this.http.delete(this.ApiUrl+'/DeleteBusiness?BusinessId='+businessId,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
    })
  });
  }
}
