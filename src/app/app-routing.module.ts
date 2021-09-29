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
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:'consumer', component:ConsumerComponent},
  {path:'addConsumer/ConsumerId/0', component:AddUpdateConsumerComponent},
  {path:'updateConsumer', component:AddUpdateConsumerComponent},
  {path:'displayConsumer',component:DisplayDeleteConsumerComponent},

  {path:'consumerBusiness', component:ConsumerBusinessComponent},
  {path:'addBusiness/BusinessId/0', component:AddUpdateBusinessComponent},
  {path:'updateBusiness', component:AddUpdateBusinessComponent},
  {path:'displayBusiness',component:DisplayDeleteBusinessComponent},

  {path:'businessProperty', component:BusinessPropertyComponent},
  {path:'addProperty/PropertyId/0', component:AddUpdatePropertyComponent},
  {path:'updateProperty', component:AddUpdatePropertyComponent , children: [{
    path: 'id', component:AddUpdatePropertyComponent }]},
  {path:'displayProperty',component:DisplayDeletePropertyComponent},

  {path:'createPolicy',component:CreatePolicyComponent},
  {path:'issuePolicy',component:IssuePolicyComponent},
  {path:'viewPolicy',component:ViewPolicyComponent},
  {path:'getQuote',component:GetQuoteComponent},
  {path:'homePage',component:HomePageComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// ng g c get-quote --skip-Tests
// ng g c consumer-business/Add-Update-business --skip-Tests
// ng g c consumer-business/display-delete-business --skip-Tests