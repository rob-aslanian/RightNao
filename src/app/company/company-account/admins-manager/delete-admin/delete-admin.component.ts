import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { CompanyProfileService } from "src/app/_shared/services/companies/company-profile.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-delete-admin",
  templateUrl: "./delete-admin.component.html",
  styleUrls: ["./delete-admin.component.scss"]
})
export class DeleteAdminComponent implements OnInit, OnChanges {
  @Input() companyId: string;
  @Input() user;
  @Output() result:EventEmitter<object> = new EventEmitter<Object>();
  delete: boolean = false;
  _user: any;
  deleteForm: FormGroup;
  isInvalid:boolean = false;
  constructor(
    private companyservice: CompanyProfileService,
    private fb: FormBuilder
  ) {
    this.deleteForm = this.fb.group({
      password: ["", Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const user: SimpleChange = changes.user;
    this._user = user.currentValue;
  }

  ngOnInit() {
  }

  validate() {
    let password = this.deleteForm.controls.password.value;
    this.companyservice.checkPassword(password).subscribe(data => {
             if(data.data.checkPassword.success){
              this.delete = true;

             }
             else{
           this.isInvalid = true;
            this.deleteForm.reset();
             }
    } )
  }
  deleteUser(){
    let input:Object = {
      company_id: this.companyId,
      password: this.deleteForm.controls.password.value,
      user_id: this._user.user.id
    };
    this.companyservice
      .deleteCompanyAdmin(input)
      .subscribe(data => {
        if(data){
          this.result.emit({
            id:this._user.user.id,
            _type:'delete'
         });
        }
        
      } );
  }
}
