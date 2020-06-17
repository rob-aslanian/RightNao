import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-post-service-request',
  templateUrl: './post-service-request.component.html',
  styleUrls: ['./post-service-request.component.scss']
})
export class PostServiceRequestComponent implements OnInit {

  service: FormGroup;
  isSubmit: boolean = false;   
  serviceRequest: string; 
  images: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private serviceServ: ServicesService
  ) {
    this.service = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        category: ['', Validators.required],
        subCategory: ['', Validators.required],
        description: ['', Validators.required],
      }),
      projectType: this.fb.group({
        typeOfProject: ['', Validators.required]
      }), 
      delivery: this.fb.group({
         time: ['Up_To_24_Hours', Validators.required],
         price: ['Price_Fixed', Validators.required],
         amount: ['', Validators.required],
         hourly: ['', Validators.required],
         currency: ['', Validators.required]
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
      visibility: this.fb.group({
        whoCanSee: ['', Validators.required],
        work: ['', Validators.required]
      }),
    })

  }

  ngOnInit() {
    this.serviceRequest = 'service-request'; 
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
    this.images = data.files; 
    
  }

  onSubmitForm() {
    this.addServices(); 
    
  }

  addServices() {
    //  *** Get FormGroups *** 
    const {
      delivery, 
      details,
      location, 
      qualifications,
      visibility,
      projectType,
    } = this.service.controls; 

    
    //  *** Delivery *** 
    const { currency, hourly, price, time, amount } = delivery['controls']; 
    //  *** Details *** 
    const { category, description, name, subCategory } = details['controls']; 
    // *** Location *** 
    const { city, country, isRemote } = location['controls']; 
    // *** Qualifications /  Additional-Details *** 
    const { languages, skills, toolTechnology } = qualifications['controls']; 
    // *** Visibility *** 
    const { whoCanSee, work } = visibility['controls']; 
    // *** Project Type *** 
    const { typeOfProject } = projectType['controls']; 
  

    const formData = {
      office_id: "123123123", 
      title: name.value, 
      description: description.value,
      category: {main:category.value, sub_category:[subCategory.value]},
      delivery_time: time.value,
      price: price.value, 
      currency: currency.value, 
      project_type: typeOfProject.value, 
      fixed_price_amount: amount.value, 
      // max_price_amount: 
      additional_details: {qualifications:{skills:skills.value, toolTechnology:toolTechnology.value, languages:languages.value}}, 
      location: {city:{city:city.value}, country_id:country.value}, 
      location_type: isRemote.value, 
      // files_id: 
      visibility: whoCanSee.value, 
      is_Draft: false, 
      is_Remote: false
    }

    
    return this.serviceServ
               .addServicesRequest(formData)
               .subscribe(data => {
               },err => {
                 console.log(err);
               }); 
  }

  
}
