import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from "./register.service";

@Component({
  templateUrl: './register.component.html',
  selector:'register'
})
export class RegisterComponent {

  public form:FormGroup;
  public fname:AbstractControl;
  public lname:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public cpassword:AbstractControl;
  public submitted:boolean = false;

  constructor(private fb:FormBuilder,private router:Router, private service:RegisterService) {
    this.form = fb.group({
      'fname': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])\w{2,}$/)])],
      'lname': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])\w{3,}$/)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)])],
      'cpassword': ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/)])]
    });
    this.fname= this.form.controls['fname'];
    this.lname= this.form.controls['lname'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.cpassword = this.form.controls['cpassword'];
  }

  public onSubmit(user:any):void {
    this.submitted = true;
    //this.errored=false;
    user.highPaper="0";
    user.highBet="0";
    user.highStake="0";
    user.highLoss=0;
    user.income=0;
    user.bets=0;
    user.nbPapers=0;
    user.success=0;
    user.successPaper=[];
    user.incomeGenerated=[];
    user.balance=0;
    user.leagues=[];
    user.paperWon=0;
    user.paperLost=0;
    user.paperCompensated=0;
    user.paperCompensatedWon=0;
    user.paperCompensatedLost=0;
    user.bestBets=[];
    user.deposits=[];
    user.deposit=0;

    console.log(user);
    for(let i=1;i<31;i++){
        user.successPaper.push(0);
        user.incomeGenerated.push(0);
        user.deposits.push(0);
    }
    this.service.signup(user).subscribe((res)=>
  
  {
    if (res.success==false){
     // this.errored=true;
      // this.error="an error has occured while registring, please try again";
    }else {
      console.log(res);
      localStorage.setItem("user",res.user._id);
      localStorage.setItem("connected","true");
      this.router.navigate(['/']);
  }});}

}
