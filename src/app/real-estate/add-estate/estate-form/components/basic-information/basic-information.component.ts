import { Component, OnInit, OnDestroy } from '@angular/core';
 
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EstateFormService } from '../../../Service/estate-form.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegionService } from 'src/app/_shared/region.service';
 

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit, OnDestroy {

 
  basicForm: FormGroup;
  isSubmitted: boolean = false;

    
  countryCodes: any = [];
  $destroy: Subject<any> = new Subject<any>();
  
  constructor(
    private estateFormSevice: EstateFormService,
    private fb: FormBuilder,
    private regionService: RegionService
  ) { 
     this.basicForm = estateFormSevice.basicForm;
  }

    ngOnInit() {           
      this.estateFormSevice
          .sumbitted
          .subscribe( ( isSubmitted ) => this.isSubmitted = isSubmitted );

      this.regionService
          .getListOfCountryCodes()
          .pipe(takeUntil(this.$destroy)).subscribe(({ data }) => this.countryCodes = data['getListOfCountryCodes'] );   
    }
  
    addNewPhone() {
         const phones = this.basicForm.get('phones') as FormArray;
         phones.push(this.addPhone())
    };

    addPhone(): FormGroup {
        return this.fb.group({
          number: ['', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
          country_code_id: ['', Validators.required ]
       })
    }
   
    deleteClick( index: number ) {
        const phones = this.basicForm.get('phones') as FormArray;
        phones.removeAt(index);
    };

  ngOnDestroy(): void {
       this.$destroy.next();
       this.$destroy.complete();
  }

}
