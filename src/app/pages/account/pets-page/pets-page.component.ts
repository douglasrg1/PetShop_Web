import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html'
})
export class PetsPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;
  constructor(private fb: FormBuilder, private toast: ToastrService, private router: Router, private service: DataService) {
    this.form = fb.group({
      document: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])]
    })
  }

  ngOnInit() {
  }

}
