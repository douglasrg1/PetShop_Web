import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  private form: FormGroup;
  public busy = false;
  constructor(private data:DataService, private fb: FormBuilder) {

    this.form = this.fb.group({
      username: ['',Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required
      ])],

      password:['',Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.required
      ])]
    })
   }

  ngOnInit() {
    const token = sessionStorage.getItem('petshop.token');
    if(token){
      this.busy = true;
      this.data.refreshToken().subscribe(
        (data: any)=>{
          sessionStorage.setItem("petshop.token",data.token);
          this.busy = false;
        },
        (err)=>{
          sessionStorage.removeItem('petshop.token');
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
        sessionStorage.setItem("petshop.token",data.token);
        this.busy = false;
      },
      (err)=>{
        console.log(err);
        this.busy = false;
      }
    )
  }

}
