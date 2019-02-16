import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "./login.service";

@Component({
  templateUrl: './login.component.html',
  selector: 'login'
})
export class LoginComponent {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service: LoginService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    this.service.login(values).subscribe((res) => {
      if (res.success == false) {
        //this.errored=true;
        //this.error=res.message;
      } else {
        console.log(res);
        localStorage.setItem("user", res.user._id);
        localStorage.setItem("connected", "true");
        this.router.navigate(['/']);
      }
    }
    );
  }

}
