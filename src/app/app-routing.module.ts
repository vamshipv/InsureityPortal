import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsumerComponent } from './consumer/consumer.component';
import { AddUpdateConsumerComponent } from './consumer/add-update-consumer/add-update-consumer.component';
import { DisplayDeleteConsumerComponent } from './consumer/display-delete-consumer/display-delete-consumer.component';

import { ConsumerBusinessComponent } from './consumer-business/consumer-business.component';
import { AddUpdateBusinessComponent } from './consumer-business/add-update-business/add-update-business.component';
import { DisplayDeleteBusinessComponent } from './consumer-business/display-delete-business/display-delete-business.component';

import { BusinessPropertyComponent } from './business-property/business-property.component';
import { AddUpdatePropertyComponent } from './business-property/add-update-property/add-update-property.component';
import { DisplayDeletePropertyComponent } from './business-property/display-delete-property/display-delete-property.component';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { IssuePolicyComponent } from './issue-policy/issue-policy.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BusinessMaster } from './Models/business-master.Model';
import { PropertyMaster } from './Models/property-master.Model';


const routes: Routes = [
  {path:'consumer', component:ConsumerComponent},
  {path:'addConsumer/ConsumerId/:id', component:AddUpdateConsumerComponent},
  {path:'updateConsumer/:id', component:AddUpdateConsumerComponent},
  {path:'displayConsumer',component:DisplayDeleteConsumerComponent},

  {path:'consumerBusiness', component:ConsumerBusinessComponent},
  {path:'addBusiness/BusinessId/:id', component:AddUpdateBusinessComponent},
  {path:'updateBusiness/:id', component:AddUpdateBusinessComponent},
  {path:'displayBusiness',component:DisplayDeleteBusinessComponent},

  {path:'businessProperty', component:BusinessPropertyComponent},
  {path:'addProperty/PropertyId/:id', component:AddUpdatePropertyComponent},
  {path:'updateProperty/:id', component:AddUpdatePropertyComponent},
  {path:'displayProperty',component:DisplayDeletePropertyComponent},

  {path:'createPolicy',component:CreatePolicyComponent},
  {path:'issuePolicy',component:IssuePolicyComponent},
  {path:'viewPolicy',component:ViewPolicyComponent},
  {path:'getQuote',component:GetQuoteComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// ng g c get-quote --skip-Tests
// ng g c consumer-business/Add-Update-business --skip-Tests
// ng g c consumer-business/display-delete-business --skip-Tests