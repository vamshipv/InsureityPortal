import { Component, OnInit } from '@angular/core';
import { ConsumerService } from 'src/app/Services/consumer.service';
import { ConsumerModel } from 'src/app/Models/consumer.model';
import { Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Form, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Agent } from 'src/app/Models/agent.model'

@Component({
  selector: 'app-add-update-consumer',
  templateUrl: './add-update-consumer.component.html',
  styleUrls: ['./add-update-consumer.component.css']
})
export class AddUpdateConsumerComponent implements OnInit {

  ConsumerList:ConsumerModel[] = [];
  consumerForm:Form;
  consumerModel:ConsumerModel={
    consumerId:0,
    consumerName:"",
    dateOfBirth: new Date(),
    email:"",
    panNumber:"",
    agentId:0
  };

  updatedConsumerData : any;

  agents:Agent[] = [
    {agentId: 1, agentName:"Shivangi"},
    {agentId: 2 , agentName:"Ram"},
    {agentId: 3 , agentName:"Vamshi"},
    {agentId: 4 , agentName:"Sathvik"},
    {agentId: 5 , agentName:"Vasavi"}
  ];


  constructor(private service:ConsumerService, public router: Router 
    , public route: ActivatedRoute, public datePipe: DatePipe) { }

  consumer : ConsumerModel;
  
//  userId:number;
  ngOnInit(): void {
    this.getConsumer();
    this.router.getCurrentNavigation()?.extras.state;
    console.log(history.state);
    console.log("Navigated to Update Page");
    this.updatedConsumerData = history.state;
    console.log(this.updatedConsumerData); //

    this.getAgentId();
    this.getAgentName();
    
  }

  logInAgentName : string | null;
  logInAgentId : number;
  getAgentId(){
    this.logInAgentName = localStorage.getItem("logInAgentName");
    if(this.logInAgentName != null){
      this.agents.forEach((a : Agent) => {
        if(a.agentName == this.logInAgentName){
          this.logInAgentId = a.agentId;
        }
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

  errorMessage = [] = "";
  create_message: string ="";
  addConsumer(consumer:ConsumerModel,consumerForm:NgForm) : void
  {
    // this.getAgentId()
    this.service.addConsumer(consumer).subscribe(data => 
      {
        this.create_message="New Consumer Created";
        this.getConsumer();
        console.log(data);
        consumerForm.resetForm();
      },
        err => {
          this.errorMessage = err.error;
        } 
    );
  }

  editAgentName:string;
  getAgentName(){
    if(this.updatedConsumerData.consumer.agentId != null){
      this.agents.forEach((a : Agent) => {
       if(a.agentId == this.updatedConsumerData.consumer.agentId){
          this.editAgentName = a.agentName;
        }
      });
      console.log(this.updatedConsumerData.consumer.agentId);
      console.log(this.editAgentName);
    }
  }
  
  update_message:string ="";
  updateConsumer(consumer:ConsumerModel) : void
  {
      this.service.updateConsumer(consumer).subscribe(data => {
      this.update_message = "Updated Consumer";
      this.getConsumer();
      console.log(data);
    },
      err => {
        this.errorMessage = err.error;
        ;
      } 
    );
  }

  
}

