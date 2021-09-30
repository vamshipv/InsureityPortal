import { Component, OnInit } from '@angular/core';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { ConsumerModel } from 'src/app/Models/consumer.model';
import { Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-consumer',
  templateUrl: './add-update-consumer.component.html',
  styleUrls: ['./add-update-consumer.component.css']
})
export class AddUpdateConsumerComponent implements OnInit {

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

  constructor(private service:ConsumerService, public router: Router , public route: ActivatedRoute) { }

  consumer : ConsumerModel

  ngOnInit(): void {
    this.getConsumer();
    // this.route.params.forEach((params: Params) => {
    //   this.service.getConsumerById(params['id']).subscribe(
    //     product => this.consumer = product,
    //   )
    // }
    // this.consumerModel = new this.consumerModel()
    // )
  }

  getConsumer()
  {
    this.service.getConsumerList().subscribe(data => {
      this.ConsumerList = data
      console.log(this.ConsumerList);
    });
  }

  create_message: string ="";
  addConsumer(consumer:ConsumerModel) : void
  {
    this.service.addConsumer(consumer).subscribe(data => 
      {
      this.create_message="New Consumer Created";
      this.service.getConsumerList();
      console.log(data);
      },
    err => {console.log(err);}
    );
  }

  update_message:string ="";
  updateConsumer(consumerId:number,consumer:ConsumerModel) : void
  {
      this.service.updateConsumer(consumerId,consumer).subscribe(data => {
      this.update_message = "Updated Consumer";
      this.service.getConsumerList();
      console.log(data);
    })
  }
}
