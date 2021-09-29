import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConsumerModel } from '../Models/consumer.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  
  constructor(private http:HttpClient) { }

  //TODO check for URL
  ApiURL:string = "https://localhost:44396/api/Consumer";
  getConsumerList():Observable<ConsumerModel[]>
  {
    return this.http.get<ConsumerModel[]>(this.ApiURL + '/GetConsumer/');
  }

  addConsumer(consumer:ConsumerModel):Observable<ConsumerModel>{
    console.log(consumer);
    return this.http.post<ConsumerModel>(this.ApiURL + '/CreateConsumer/',consumer,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  updateConsumer(consumerId:number ,consumer:ConsumerModel){
    console.log(consumer);
    return this.http.put(this.ApiURL+'/UpdateConsumer?ConsumerId='+consumerId,consumer,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
  // https://localhost:44396/api/Consumer/DeleteConsumer?ConsumerId=11
  // https://localhost:44396/api/Consumer/DeleteConsumer?ConsumerId=211
  deleteConsumer(ConsumerId:number){
    return this.http.delete(this.ApiURL+'/DeleteConsumer?ConsumerId='+ConsumerId,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
    })
  });
  }

  getConsumerById(consumerId:number)
  {
    return this.http.get(this.ApiURL + '/GetConsumerById?ConsumerId=' + consumerId,
    {
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
    })
  });
}
}