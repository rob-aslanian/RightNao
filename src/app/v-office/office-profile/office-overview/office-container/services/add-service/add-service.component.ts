import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { Subject, Observable, merge } from 'rxjs';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { WorkingHoursComponent } from './location/working-hours/working-hours.component';
import { map, switchMap } from 'rxjs/operators';
import { ServiceSliderComponent } from 'src/app/_shared/components/service-slider/service-slider.component';
 
 
  
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss', '../../../../../_shared/style.scss']
})

export class AddServiceComponent implements OnInit, OnDestroy {

   @ViewChildren( WorkingHoursComponent ) buesniessHours: QueryList<WorkingHoursComponent>;
   @ViewChild( ServiceSliderComponent, { static: false } ) slider: ServiceSliderComponent

   service: FormGroup;
   isSubmit: boolean = false;
   officeId: string;
   $destroy: Subject<any> = new Subject<any>()
   images: any = [];
   id: string;
   isCompanyActive: any;
 
   navigateToOffice: string;
   buesniesHourse: any[] = [ null ];
   isHoursDisabled: boolean = false;
   toggleWorkingOurs: boolean = false;
   hourse: any[] = [ { } , { }, { } ];
   isEdit: boolean = false;
   editServiceId: string = '';
   filesForEdit: any[] = [];
   hourEdit: any = [];
   editHours:any [] = [];
   deletedFilesIds: string[] = [];
 
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private officeService: OfficeService,
    private imageUploadService: ImageUploadService,
    private storage: GlobalUserProService,
    private router: Router
  ) { 

      this.service = this.fb.group({
        details: this.fb.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
          subCategory: ['', Validators.required],
          description: ['', Validators.required],
        }),
        delivery: this.fb.group({
           time: ['Up_To_24_Hours', Validators.required],
           price: ['Price_Fixed', Validators.required],
           amount: ['', Validators.required],
           hourly: [''],
           currency: ['USD', Validators.required],
           date: ['']
        }),
        qualifications: this.fb.group({
          skills: this.fb.array([ ]),
          toolTechnology: this.fb.array([ ])
        }),
        location: this.fb.group({
           isRemote:['Remote_only'],
           country:[''],
           city: ['']
        }),
        hoursDisabled: [ false ]
      }) 
  }


  get details() {
      return this.service.get('details')         as FormGroup;
  }

  get delivery() {
      return this.service.get('delivery')        as FormGroup;
  }
  
  get qualifications() {
      return this.service.get('qualifications');
  }

  get location() {
       return this.service.get('location')       as FormGroup;
  };
 
  ngOnInit() {
 
    const edit = this.activatedRoute.snapshot.data['type']; 

    this.isEdit = edit && edit === 'edit' ? true : false;

    this.officeId = this.activatedRoute.snapshot.params['id'];
   /// Edit
    if( this.isEdit ) {      
         this.editServiceId = this.activatedRoute.snapshot.params['serviceId'];
         this.handleOnEditService();
    }   

    this.id = this.storage.isCompanyActive() ? 
              this.storage.getComapnyId() : 
              this.storage.getUserProfile().id;
              
    this.navigateToOffice  = this.storage.isCompanyActive() ? 'company' :'user';


 
    // Get V Office Main Category
    this.officeService
    .getMainCategory(this.officeId).subscribe( mainCat =>  this.service.get('details').get('category').setValue(mainCat) );
 
  }

  submit(is_Draft = false): ( void | boolean ) {

   const files = this.removeDimensions( this.images );
      
   // Validate Working Hourse 
    const invalid =  this.buesniessHours.filter( hoursInstance => ( 
                                                  hoursInstance.hasErrors || 
                                                  hoursInstance.fromCtrl.invalid || 
                                                  hoursInstance.toCtrl.invalid)).length > 0 && !this.isHoursDisabled  ? true : false;

 
    
    if( !this.service.valid || invalid  || this.slider.checkHasError() ) {
          this.isSubmit = true;
           return;
      }

    // Get formGroups
     const { delivery, details, location, qualifications } = this.service.controls;

   // Get delivery formGroup Controls Value  
     const { amount,currency, hourly,price,time  } = delivery['controls'];

   // Get details formGroup Controls Value  
     const { category,description, name,subCategory } = details['controls'];

   // Get location formGroup Controls Value  
     const { city,country, isRemote   } = location['controls'];

   // Get qualifications formGroup Controls Value  
     const { skills, toolTechnology  } = qualifications['controls'];
    
   // Get images  
     let input  = {
            office_id: this.officeId,
            title: name.value,
            description: description.value,
            category: {
                main: category.value,
                sub_category:[ subCategory.value ]
            },
            delivery_time: time.value,
            price: price.value,
            currency: currency.value,
            fixed_price_amount: price.value === 'Price_Fixed' || price.value === 'Price_Hourly'   ? amount.value : undefined,
            min_price_amount:   price.value === 'Price_Negotiable' ? amount.value: undefined,
            max_price_amount:   price.value === 'Price_Negotiable' ? hourly.value: undefined,
            additional_details: {
                  qualifications:{
                      skills: skills.value ,
                      toolTechnology: toolTechnology.value 
                  },  
            },
            is_Remote: isRemote.value === 'Remote_only' ?  true : false,
            is_Draft,
            location_type: isRemote.value,
            location: isRemote.value != 'Remote_only' ? { country_id: country.value.asc, city: { id: city.value['id']  }  } : undefined,
            wokring_hour: {
                is_always_open: this.isHoursDisabled,
                working_date: this.isHoursDisabled ? [] : this.hourse.filter( item => item['week_days'] )
            }
            
     };

    if( this.isEdit ) {
        return this.editService( input );
    }
    this.officeService
    .addVofficeService( this.officeId, input ).pipe(
        map( ({ data }) => data['AddVOfficeService']['id'] ),
        switchMap( ( id ) => this.uploadFiles( id, files ) )
    ).subscribe( ( ) =>  this.router.navigate( [ 'v-office', 'office', this.officeId, this.navigateToOffice, this.id] ) ); 
  
  }

   // Get images from slider
  getImages(images: { slider: any[], _case: string }) {

    if(images._case === 'add') {
        this.images = images.slider;
    } else if (images._case === 'delete') {
        this.images = images.slider
        if( images['deletedId'] ) {
            this.deletedFilesIds.push(images['deletedId']);
            
        }
  
    }
  
  }
  
  uploadFiles( id: string, files: any[] ): Observable<any> {
        const formData: FormData = new FormData();
        files.map( ( file: Blob ) => formData.append('file', file ) );
        return this.imageUploadService.uploadOfficeService(this.officeId, id, formData)
  }

  removeVoffieService(): void {
      // this.officeService
      // .removeVofficeService(this.edit.id)
      //  .subscribe( ()  =>  this.route.navigate(['v-office', this.navigateToOffice ,'office', this.id]) )
  }

  getBuesniessHours( hours: any, idx: number ){
      
      if( hours._case === 'days' ) {
        this.hourse[idx]['week_days'] =   hours['days'] ? hours['days']: [];
      }
      if( hours._case === 'from' ) {
        this.hourse[idx]['hour_from'] = `${hours.hour}:${hours.minute}`;
      }
      if( hours._case === 'to' ) {
          this.hourse[idx]['hour_to'] = `${hours.hour}:${hours.minute}`;
      }
       
      
     
  };

  addAnotherHours() {
    this.buesniesHourse.push( null );
  }

  removeDimensions( images: any[] ) {
    const files = [];
         for (let index = 0; index < images.length; index++) {
                for (let j = 0; j < images[index].length; j++) {
                          if(images[index][j]['file'] && images[index][j]['file']['name']) {
                            files.push(images[index][j]['file'])
                          }
                }
         }
    return files;
  };

  handleOnEditService() {
      this.officeService
        .getVOfficeServiceById( this.officeId,  this.editServiceId  )
          .subscribe( service => {
                 this.patchValueToForm( service );
                 this.handleFilesEdit( service.files );
                 this.handleBuesniessHoursEdit( service.wokring_hour );
          } )
      
  }

  patchValueToForm( service ) {    
     const details =  service.additional_details.qualifications;

      this.service.patchValue({
          details: {
            name: service.title,
            category: service.category.main,
            subCategory: service.category.sub_Category[0],
            description: service.description,
          },
          delivery: {
            time: service.delivery_time,
            price: service.price,
            amount: service.price === 'Price_Fixed' || service.price === 'Price_Hourly' ? service.fixed_price_amount : service.min_price_amount,
            hourly: service.price === 'Price_Negotiable' ? service.max_price_amount : '',
            currency: service.currency
          },
          location: {
            isRemote: service.location_type,
            country: {
              asc: service.location.country.country,
              name: service.location.country.country
            },
            city: {
                city: service.location.city.city
            }
          }
      })
 
            
      //@ts-ignore
        details['skills'].map( skill => this.qualifications.get('skills').push(this.fb.group({
              id: skill.id,
              skill: skill.skill
        })) )
        //@ts-ignore
        details['toolTechnology'].map( tool => this.qualifications.get('toolTechnology').push(this.fb.group({
              id: tool.id,
              tool_Technology: tool.tool_Technology,
              rank: tool.rank
        })) )
       
  }

  handleFilesEdit( files ) {

      let counter = -1;
      for (let index = 0; index < 9; index++) {
          if(  index % 3 === 0 ) {
              counter++;
              this.filesForEdit.push([]);         
            };

          if( files[index] &&  files[index]['address'] && files[index]['id'] ) {
              this.filesForEdit[counter].push({img: files[index]['address'],  id:  files[index]['id'],  file: {}  }) 
          } else { this.filesForEdit[counter].push( {img: null,  id:  null,  file: {}  } ); }    
      } 
    
  }

  handleBuesniessHoursEdit( hour ) {

    if( !hour.is_always_open && !hour.working_date.length ) return;
           this.editHours =  hour.working_date;
           this.buesniesHourse = hour['working_date'].map( ( item ) =>  item );
           hour['working_date'].map( ( item, i ) =>  {
                this.hourse[i] = Object.assign( item, { } );
           } );
           
           this.hourEdit =  hour['working_date'];
           if( hour.is_always_open ) return this.service.get('hoursDisabled').setValue(true);
           this.toggleWorkingOurs  = true;   
  };

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  editService( input: any )   {
      this.officeService
      .changeVofficeService(this.editServiceId, this.officeId,  input).pipe(
          switchMap( id =>   this.mergeEditRequests( id, this.editServiceId, this.officeId, this.deletedFilesIds ) )
      ).subscribe( data => this.router.navigate( [ 'v-office', 'office', this.officeId, this.navigateToOffice, this.id] )  )
  }

  removeFIlesInService( deletedIds: string[], serviceId: string ): Observable<any> {
         return  this.officeService
                    .removeFilesInService( serviceId, deletedIds )
  }

 // Handle files edit 
  mergeEditRequests( id: string, serviceId: string, officeId: string, deletedFiles: any[] ): Observable<any> {
      const files = this.removeDimensions( this.images );
       return merge(
           this.uploadFiles( id,  files ),
           this.removeFIlesInService( deletedFiles, serviceId )
       );
  }

  deleteHour( idx: number ) {
       this.buesniesHourse.splice( idx , 1 ); 
  }
}
