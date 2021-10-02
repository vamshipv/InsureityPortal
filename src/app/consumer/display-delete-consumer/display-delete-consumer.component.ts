import { Component, OnInit } from '@angular/core';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { ConsumerModel } from 'src/app/Models/consumer.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-display-delete-consumer',
  templateUrl: './display-delete-consumer.component.html',
  styleUrls: ['./display-delete-consumer.component.css']
})
export class DisplayDeleteConsumerComponent implements OnInit {

  ConsumerList:ConsumerModel[] = [];
  deleteConsumerId = 0;
  consumerModel:ConsumerModel ={
    consumerId:0,
    name:"",
    dateOfBirth: new Date,
    email:"",
    panNumber:"",
    agentId:0,
    agentName:""
  };

  consumer_Id : number = 0;
  consumerPgNo:number = 1;
  name:string;
  constructor(private service:ConsumerService, public router: Router) { }

  ngOnInit(): void {
    this.getConsumer();
  }

  searchConsumer(){
    if(this.name == ""){
      this.ngOnInit()
    }
    else{
      this.ConsumerList = this.ConsumerList.filter(p => {
        return p.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  getConsumer()
  {
    this.service.getConsumerList().subscribe(data => {
      this.ConsumerList = data
      console.log(this.ConsumerList);
    });
  }

  delete_message:string="";
  deleteConsumer(consumerId:number) : void
  {
      debugger;
      this.service.deleteConsumer(consumerId).subscribe(data =>
      {
        // alert("Consumer ID" +  " " + consumerId.toString()+ " " + "Deleted")
        this.router
        this.service.getConsumerList();
        this.delete_message = "Deleted Consumer" + consumerId;
        console.log(data);
      })
    //debugger;
  }

  addClick()
  {
    this.router.navigate(['/addConsumer/ConsumerId/0']);
  }

  editClick(consumer:ConsumerModel) : void
  {
    // this.router.navigate(['/updateConsumer/',consumerId ]);
    this.router.navigateByUrl('/updateConsumer/', {state: { consumer } });
    console.log("Update Done");

  }
}
