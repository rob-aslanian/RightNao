import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { switchMap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
 

@Component({
  selector: 'app-services-post-service',
  templateUrl: './services-post-service.component.html',
  styleUrls: ['./services-post-service.component.scss']
})
export class ServicesPostServiceComponent implements OnInit {

 
  service: FormGroup;
  isSubmit: boolean = false;   
  serviceRequest: string; 
  images: any[] = []; 
  editServiceId: string = '';
  isEdit: boolean = false;
  editFiles: any[] = [];
  deletedFilesIds: string[] = [];


  constructor(
    private fb: FormBuilder,
    private serviceServ: ServicesService,
    private imageUploadService: ImageUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.service = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        subCategory: ['', Validators.required],
        description: ['', Validators.required],
      }),
      projectType: this.fb.group({
        typeOfProject: ['One_Time_Project', Validators.required]
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
        toolTechnology: this.fb.array([ ]),
        languages: this.fb.array([ ])
      }),
      location: this.fb.group({
         isRemote:['Remote_only'],
         country:[''],
         city: ['']
      }),
        service_provider: ['No_Preference']
    })

  }

  ngOnInit() {
      this.serviceRequest = 'service-request'; 
      this.isEdit = this.activatedRoute.snapshot['data']['type'] && this.activatedRoute.snapshot['data']['type'] === 'edit' ? true : false;
      if( this.isEdit ) {
            this.editServiceId = this.activatedRoute.snapshot.params['id'];
             this.serviceServ
              .getServiceRequest( this.editServiceId ).subscribe( data => this.handleServieRequestEdit( data ) )
      } ;
        
       
  }


  get details() {
    return this.service.get('details')    as FormGroup; 
  }

  get delivery() {
    return this.service.get('delivery')  as FormGroup; 
  }

  get qualifications() {
    return this.service.get('qualifications')  as FormGroup; 
  }

  get location() {
    return this.service.get('location')  as FormGroup; 
  }

  get visibility() {
    return this.service.get('visibility') as FormGroup; 
  }

  get projectType() {
    return this.service.get('projectType')  as FormGroup; 
  }

  getFiles(data: any) {

    if( data.case === 'add' ) {
         this.images = data.files; 
    } else if( data.case === 'delete' ) {
         this.deletedFilesIds.push( data['id'] );
    }

  };
 
  addServices( is_Draft: boolean = false ) {
    
    this.delivery.get('date').clearValidators();
    this.delivery.get('date').updateValueAndValidity();
    

    this.isSubmit = true;
    if( this.service.invalid ) return;

    //  *** Get FormGroups *** 
    const {
      delivery, 
      details,
      location, 
      qualifications,
      projectType,
    } = this.service.controls; 

    
    //  *** Delivery *** 
    const { currency, hourly, price, time, amount, date } = delivery['controls']; 
    //  *** Details *** 
    const { category, description, name, subCategory } = details['controls']; 
    // *** Location *** 
    const { city, country, isRemote } = location['controls']; 
    // *** Qualifications /  Additional-Details *** 
    const { languages, skills, toolTechnology } = qualifications['controls']; 
  
    // *** Project Type *** 
    const { typeOfProject } = projectType['controls']; 

 
  
    const formData = {
      title: name.value, 
      description: description.value,
      category: { main:category.value, sub_category:[subCategory.value] },
      delivery_time: time.value,
      price: price.value, 
      currency: currency.value, 
      project_type: typeOfProject.value, 
      fixed_price_amount: price.value !== "Price_Negotiable" ? amount.value : 0, 
      min_price_amount: price.value === "Price_Negotiable" ? amount.value : 0 ,
      max_price_amount: price.value === "Price_Negotiable" ? hourly.value : 0 ,
      additional_details: {
          skills:skills.value,
          languages:languages.value,
          tools_Technologies: toolTechnology.value,
          service_provider: this.service.get('service_provider').value
        }, 
      location: isRemote.value !== 'Remote_only' ?
                {city: { id: city.value.id, city: city.value.city } , country_id: country.value.asc } : 
                undefined, 
      location_type: isRemote.value, 
      is_Draft, 
      is_Remote: false,
      custom_date: time.value === 'Custom' ? `${date.value['day']}-${date.value['month']}-${date.value['year']}` : ''
    }
    if( this.isEdit )  {
      // Edit
      merge(
        this.serviceServ
         .changeServiceRequest( this.editServiceId, formData ),
         this.removeFiles(),
         this.uploadServiceRequestFiles( this.editServiceId )
      ).subscribe( () => this.router.navigate(['/services', 'manage', 'my-requests' ]) )

    } else {
      // Add
      this.serviceServ
      .addServicesRequest(formData).pipe(
          switchMap(  ( id ) => this.uploadServiceRequestFiles( id ) )
      ).subscribe( ( ) => this.router.navigate(['/services', 'manage', 'my-requests' ]) );
    }

  };

  uploadServiceRequestFiles( id: string ):  Observable<any> {
    const formData: FormData = new FormData();
    this.images.map(
      ( file ) => file['blob'] ? formData.append('file', file['blob']) : null
    );
    return this.imageUploadService
              .uploadPostServiceRequestFiles( id, formData)

  }

  handleServieRequestEdit( service: any ) {
    
         this.pachValueToForm( service );
         this.editFiles = service.files.map( file => {
              return {
                   address: file.address,
                   id: file.id,
                   mime_type: file.mime_type === 'application/pdf' ? file.mime_type : file.mime_type.split('/')[0],
                   name: file.name,
              } 
         } );
  }

  pachValueToForm( service ) {

    const spilitedDate: string[] | boolean = service.delivery_time === 'Custom' && service['created_at'].split('-');  
    const details =  service.additional_details;
    
     this.service.patchValue({
          details: {
            name: service.title,
            category: service.category.main,
            subCategory: service.category.sub_Category[0],
            description: service.description,
          },
          projectType:  {
            typeOfProject: service.project_type
          }, 
          delivery:  {
            time: service.delivery_time,
            price: service.price,
            amount: service.price !== "Price_Negotiable" ? service.fixed_price_amount : service.min_price_amount,
            hourly: service.price !== "Price_Negotiable" ? '' : service.max_price_amount,
            currency: service.currency,
            date: spilitedDate ?  { day: +spilitedDate[0], month: +spilitedDate[1] ,year: +spilitedDate[2]  } : ''
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
          },
            service_provider: service.additional_details.service_provider   
     });

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
    })) );

      //@ts-ignore
    details['languages'].map( lang => this.qualifications.get('languages').push(this.fb.group({
          id: lang.id,
          language: lang.language,
          rank: lang.rank
    })));
 
  }

  removeFiles(): Observable<any> {
      return this.serviceServ
               .removeFilesInServiceRequest( this.editServiceId, this.deletedFilesIds );
  }
 

}
