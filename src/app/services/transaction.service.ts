import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class TransactionService {

  constructor( private http : HttpClient) { }
  
  addTransaction(values:Object){
    return this.http.post<any>("http://localhost:3000/transactions/transaction",values);
  }
}
