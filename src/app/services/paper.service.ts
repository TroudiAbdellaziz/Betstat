import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class PaperService {

  constructor(public http :HttpClient) { }
  addPaper(values:Object):Observable<any>{
    return this.http.post<any>('http://localhost:3000/papers/paper',values);
  }
}
