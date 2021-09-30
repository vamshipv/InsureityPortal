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

  consumerModel:ConsumerModel ={
    consumerId:0,
    name:"",
    dob:"",
    email:"",
    panNumber:"",
    agentId:0,
    agentName:""
  };

  consumer_Id : number = 0;
  constructor(private service:ConsumerService, public router: Router) { }

  ngOnInit(): void {
    this.getConsumer();
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
    //debugger;
    this.service.deleteConsumer(consumerId).subscribe(data =>
      {
        alert("Consumer ID" +  " " + consumerId.toString()+ " " + "Deleted")
        this.service.getConsumerList();
        this.delete_message = "Deleted Consumer" + consumerId;
        console.log(data);
      })
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
