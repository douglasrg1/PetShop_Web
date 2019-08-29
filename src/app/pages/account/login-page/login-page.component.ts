import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  private form: FormGroup;
  constructor(private data:DataService, private fb: FormBuilder) {

    this.form = this.fb.group({
      username: ['',Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(22),
        Validators.required
      ])],

      password:['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.required
      ])]
    })
   }

  ngOnInit() {
  }

}
