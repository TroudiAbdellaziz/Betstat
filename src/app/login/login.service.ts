/**
 * Created by mohma on 7/5/2017.
 */
import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  login(data:any){
    console.log("logging in");
    return this.http.post<any>('http://localhost:3000/user/login',data);
  }
  authenticate(email,password) {


  }

}
