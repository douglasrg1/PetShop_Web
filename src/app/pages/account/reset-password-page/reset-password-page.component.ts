import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {

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
  submit(){
    this.busy = true;
    this.service.resetPassword(this.form.value).subscribe(
      (data : any)=>{
        this.busy = false;
        this.toast.success(data.message,'Senha restaurada');
        this.router.navigate(['/login']);
      },
      (err)=>{
        console.log(err);
        this.busy = false;
      }
    )
  }

}
