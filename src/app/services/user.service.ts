import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }
  login(data:any){
    console.log("logging in");
    return this.http.post<any>('http://localhost:3000/user/login',data);
  }
  signup(data:any){
    console.log("signing up");
      return this.http.post<any>('http://localhost:3000/user/signup',data);  
  }
  getUser(id:String){
    return this.http.get<any>("http://localhost:3000/user/getuser/"+id);
  }
}
