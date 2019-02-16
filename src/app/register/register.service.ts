/**
 * Created by mohma on 7/5/2017.
 */
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor( private http: HttpClient) {
  }

  authenticate(email,password) {


  }
  signup(data:any){
    console.log("signing up");
      return this.http.post<any>('http://localhost:3000/user/signup',data);  
  }
  checkpass(data:any){
    return this.http.post<any>('http://localhost:3000/user/checkPassAndChange',data);
  }
}
