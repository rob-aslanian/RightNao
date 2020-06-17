import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { categories } from 'src/assets/data/categories'; 
@Component({
  selector: 'app-service-request-details',
  templateUrl: './service-request-details.component.html',
  styleUrls: ['./service-request-details.component.scss', '../services-post-service.component.scss']
})
export class ServiceRequestDetailsComponent implements OnInit {
  
  @Input() details: FormGroup;

  categories = categories;
  subCategories: any[] = [];
  isSubmitted = false;

  @Input() set isSubmit( value: boolean ) {
     this.isSubmitted = value;
  } 
  
  get detailsCtrl() {
      return this.details.controls;
  }

  constructor() { }

  ngOnInit() {
      this.details
        .get('category').valueChanges
         .subscribe( value =>  this.subCategories = this.categories.filter( cat => cat.name === value )[0]['subCategories']);
  };

  

}
