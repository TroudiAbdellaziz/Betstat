import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, CommonModule, HashLocationStrategy} from '@angular/common';
import {PaperService} from '../app/services/paper.service';
import {UserService} from '../app/services/user.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {TransactionService} from '../app/services/transaction.service';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { FullLayoutComponent} from './layout/full-layout.component';
import {Ng2AutoBreadCrumb} from "ng2-auto-breadcrumb";
import {Ng2NewsListComponent} from "./components/ng2-newslist/ng2newslist.component";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    Ng2AutoBreadCrumb,
    HttpClientModule
  ],
  declarations: [
    FullLayoutComponent,
    AppComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    
  },
  PaperService, UserService
  , TransactionService
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
