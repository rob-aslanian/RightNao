import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ILocation } from 'src/app/_shared/models/company/location.interface';
import { LocationFormComponent } from 'src/app/_shared/components/company/location-form/location-form.component';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-company-addresses',
  templateUrl: './company-addresses.component.html',
  styleUrls: ['./company-addresses.component.scss']
})
export class CompanyAddressesComponent implements OnInit {

  @ViewChild(LocationFormComponent, { static: false }) form:LocationFormComponent;
  @ViewChild('addressContent', { static: true }) addressContent:ElementRef;
  

  @Input() data:ILocation[];
  @Input() id:string;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  destroy$:Subject<any> = new Subject<any>();
  formType:string = null;
  isOpenForm: boolean = false;
  isOpenEditForm:boolean = false;
  editableContent:ILocation
  editIndex: number = 0;
  isAddressPrimary = {};

  constructor(
    private companyService:CompanyAccountService
  ) { 
    
  }

  ngOnInit() {
    this.parsePrimaryData();
    
  }

  parsePrimaryData(){
    this.data.map(addr => {  
     return  this.isAddressPrimary[addr.id] = addr.primary; 
    })
  }


  
  toggle(type?:string ,  index?:number , content?:ILocation) {

      this.formType = type;

      if(type === 'add'){
        this.isOpenForm = !this.isOpenForm;
        this.isOpenEditForm = false;
      }else{
        this.isOpenEditForm  = true;
        this.isOpenForm = false;
        this.editableContent = content;
      }

      this.result.emit('addresses');

      this.scrollTo();


    
  }

  scrollTo() {  
    if(this.addressContent){
      utilities.scrollIntoView(this.addressContent.nativeElement);
    }
  }
  parseCountry(abbr:string){
    return utilities.getCountryName(abbr);
  }


  submit(){
 
    if(this.form.submitForm()){
      let location:ILocation = this.form.locationChanges;

      this.isAddressPrimary = {};
      if(location){
        /// Add Address ///
        if(this.formType === 'add'){
            this.companyService
                .addAddress(this.id , location)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  ({ data }) => {
                    let id = data['AddCompanyAddress'].id;
                    this.isAddressPrimary[id] = location.primary;
                    if(id){
                      location.id = id;
                      this.data.unshift(location);
                    }
                    this.isOpenForm = false;
                  }
                )
        }
        /// Edit Address ///
        else{
           this.companyService
               .changeAddress(this.id , location)
               .pipe(takeUntil(this.destroy$))
               .subscribe(
                 ({data}) => {
                   let id = this.editableContent.id;
                   this.isAddressPrimary[id] = location.primary;
                   if(id){
                     let indexOfLocation = this.data.findIndex(loc => loc.id == location.id);

                     indexOfLocation > -1 ? this.data[indexOfLocation] = location : null;
                   }
                   this.isOpenEditForm = false;
                 },
                 (err) => {
                   console.log(err);

                 }
               )
        }
      }
    }
 
    
  }

  /// Remove Address ///
  remove(){
    let id = this.editableContent.id;

    if(id){
      this.companyService
          .deleteAddress(this.id , id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            ({ data }) => {
              let indexOfLocation = this.data.findIndex(loc => loc.id == id);

              indexOfLocation > -1 ? this.data.splice(indexOfLocation , 1) : null;

              this.isOpenEditForm = false;
            },
            (err) => {
              console.log(err);
            }
          )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
  }

}
