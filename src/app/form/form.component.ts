/**
 * Created by mohma on 7/26/2017.
 */
import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import {PaperService} from '../services/paper.service';
import {TransactionService} from '../services/transaction.service';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
@Component({
  templateUrl: './form.component.html',
  selector:'formPage'
})
export class FormComponent {
  public form:FormGroup;
  public checkboxGroup:FormGroup;
  public formBet:FormGroup;
  public formTransaction:FormGroup;
  public money:AbstractControl;
  public typeTransaction:AbstractControl;
  public date:AbstractControl;
  public description:AbstractControl;
  public price:AbstractControl;
  public cote:AbstractControl;
  public revenue:AbstractControl;
  public num:AbstractControl;
  public type:AbstractControl;
  public coteBet:AbstractControl;
  public league:AbstractControl;
  public stateBet:AbstractControl;
  public typeBet:AbstractControl;
  public test:string;
  constructor(private fb:FormBuilder,
              private http:HttpClient,
              private paperService:PaperService,
              private transactionService:TransactionService) {

    this.form = fb.group({
      'price': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'cote': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'revenue': ['', Validators.compose([Validators.required, Validators.min(0)])],
      'num': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'type': ['normal'],
      'state':['won'],
      'bets': new FormArray([])
    });
    this.price= this.form.controls['price'];
    this.cote= this.form.controls['cote'];
    this.revenue = this.form.controls['revenue'];
    this.num = this.form.controls['num'];
    this.type = this.form.controls['type'];

    
    this.formBet = fb.group({
      'league': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'coteBet': '',
      'stateBet': '',
      'typeBet': new FormArray([])
    });
    this.coteBet= this.form.controls['coteBet'];
    this.league = this.form.controls['league'];
    this.stateBet = this.form.controls['stateBet'];
    this.typeBet = this.form.controls['typeBet'];


    this.formTransaction = fb.group({
      'money': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'typeTransaction': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'date': '',
      'description': ''
    });

    this.money= this.form.controls['money'];
    this.typeTransaction = this.form.controls['typeTransaction'];
    this.date = this.form.controls['date'];
    this.description = this.form.controls['description'];

  }
  addBet(values:Object):void{
    console.log(values)

    const formArray: FormArray = this.form.get('bets') as FormArray;
  
    /* added */

      formArray.push(new FormControl(values));
    
    var para = document.createElement("h3");
    var node = document.createTextNode("state: "+ values['stateBet'].toString()+"  league: "+ values['league'].toString()+" cote: "+values['coteBet'].toString());
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.appendChild(para);


  }
  public onSubmit(values:Object):void {
    console.log(values);
    values['user']=localStorage.getItem("user");
    this.paperService.addPaper(values).subscribe((res)=>  
    {
      console.log(res);
    });
  }


  public addTransaction(values:Object):void {
    console.log(values);
    values['user']=localStorage.getItem("user");
    this.transactionService.addTransaction(values).subscribe((res)=>  
    {
      console.log(res);
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.formBet.get('typeBet') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
}


