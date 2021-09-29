import { Component, OnInit } from '@angular/core';
import { Quote } from '../Models/quote.model';
import { PolicyService } from '../Services/policy.service';

export class GetQuoteForm{
  bvalue:number = 0;
  pvalue:number = 0;
}

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit {

  ViewQuoteData:Quote;
  EmptyQuoteData:Quote;
  quoteForm:GetQuoteForm = new GetQuoteForm();
  noquote:string;

  constructor(private service:PolicyService) { }

  ngOnInit(): void {
  }

  isNotEmptyQuote(val: any):boolean{
    return val !== this.EmptyQuoteData || val != null; // typeof val !== 'string';
  }

  viewQuote(bvalue:string, pvalue:string){  //param : {
    const param = {bvalue, pvalue};
    this.service.getQuote(param).subscribe(
      data => {
        console.log(data);
        if(data == null){
          this.ViewQuoteData = this.EmptyQuoteData;
          this.noquote = "Quote Not Found";
        }
        else{
          this.ViewQuoteData = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }  


}
