import { Component, OnInit } from '@angular/core';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { ConsumerModel } from 'src/app/Models/consumer.model';
import { Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-update-consumer',
  templateUrl: './add-update-consumer.component.html',
  styleUrls: ['./add-update-consumer.component.css']
})
export class AddUpdateConsumerComponent implements OnInit {

  ConsumerList:ConsumerModel[] = [];
  consumerForm:Form;
  consumerModel:ConsumerModel ={
    consumerId:0,
    consumerName:"",
    dateOfBirth: new Date(),
    email:"",
    panNumber:"",
    agentId:0,
  };
  dob = new Date();



  agentNameForDropDown = [
    {id: 1, agentNameDrop:"Shivangi"},
    {id: 2 , agentNameDrop:"Ram"},
    {id: 3 , agentNameDrop:"Vamshi"},
    {id: 4 , agentNameDrop:"Sathvik"},
    {id: 5 , agentNameDrop:"Vasavi"}
  ];
  selectedAgentId : string = "" ;
  dropDownId : number = 0;
  updatedConsumerData : any;


  constructor(private service:ConsumerService, public router: Router 
    , public route: ActivatedRoute, public datePipe: DatePipe) { }

  consumer : ConsumerModel 
  
  ngOnInit(): void {
    this.getConsumer()
    this.router.getCurrentNavigation()?.extras.state;
    // {{debugger}}
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedConsumerData = history.state;
    // this.updatedConsumerData.dob = this.updatedConsumerData.dob.Date();
    console.log(this.updatedConsumerData);
    // debugger;
    // Date() dob = this.updatedConsumerData.dateOfBirth;
    // dob = dob.datePipe.transform(new Date(), 'dd/MM/yyyy');
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
      // this.consumerForm.reset();
      this.create_message="New Consumer Created";
      this.service.getConsumerList();
      console.log(data);
      },
    err => {console.log(err);}
    );
  }

  update_message:string ="";
  updateConsumer(consumer:ConsumerModel) : void
  {

      this.service.updateConsumer(consumer).subscribe(data => {
      this.update_message = "Updated Consumer";
      this.service.getConsumerList();
      this.router.navigate(['/consumer'])
      console.log(data);
    })
  }

  
}

