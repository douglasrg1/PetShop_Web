import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validators';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  private form: FormGroup;
  public busy = false;
  constructor(private data:DataService, private fb: FormBuilder,private router: Router) {

    this.form = this.fb.group({
      username: ['',Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],

      password:['',Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.required
      ])]
    })
   }

  ngOnInit() {
    const token = Security.getToken();
    if(token){
      this.busy = true;
      this.data.refreshToken().subscribe(
        (data: any)=>{
          this.setUser(data.customer,data.token);
          this.busy = false;
        },
        (err)=>{
          Security.clear();
          console.log(err);
          this.busy = false;
        }
      )
    }
    
  }
  submit(){
    this.busy = true;
    this.data.authenticate(this.form.value).subscribe(
      (data: any)=>{
        this.setUser(data.customer,data.token)
        this.busy = false;
      },
      (err)=>{
        Security.clear();
        console.log(err);
        this.busy = false;
      }
    )
  }
  setUser(user,token){
    Security.set(user,token);
    this.router.navigate(['/']);
  }

}
