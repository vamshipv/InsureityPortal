import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { AddUpdateConsumerComponent } from './consumer/add-update-consumer/add-update-consumer.component';
import { DisplayDeleteConsumerComponent } from './consumer/display-delete-consumer/display-delete-consumer.component';
import { ConsumerBusinessComponent } from './consumer-business/consumer-business.component';
import { BusinessPropertyComponent } from './business-property/business-property.component';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { IssuePolicyComponent } from './issue-policy/issue-policy.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { AddUpdatePropertyComponent } from './business-property/add-update-property/add-update-property.component';
import { DisplayDeletePropertyComponent } from './business-property/display-delete-property/display-delete-property.component';
import { AddUpdateBusinessComponent } from './consumer-business/add-update-business/add-update-business.component';
import { ConsumerService } from './Services/consumer.service';
import { DisplayDeleteBusinessComponent } from './consumer-business/display-delete-business/display-delete-business.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ConsumerComponent,
    AddUpdateConsumerComponent,
    DisplayDeleteConsumerComponent,
    ConsumerBusinessComponent,
    BusinessPropertyComponent,
    CreatePolicyComponent,
    IssuePolicyComponent,
    ViewPolicyComponent,
    GetQuoteComponent,
    AddUpdatePropertyComponent,
    DisplayDeletePropertyComponent,
    AddUpdateBusinessComponent,
    DisplayDeleteBusinessComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [ConsumerService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
