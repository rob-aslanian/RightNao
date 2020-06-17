import { Component, OnInit, Input } from '@angular/core';
import { categories } from 'src/assets/data/categories'; 
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss', '../../../../../../_shared/style.scss']
})

export class ServiceDetailsComponent implements OnInit {

  @Input() details: FormGroup ;

  @Input() set  isSubmit(value: boolean) {
     this.submited = value;
  }  

  categories = categories;

  subCat: any[];

  submited: boolean = false;

  constructor() { }

  ngOnInit() {
 
    this.details.get('category').valueChanges.subscribe( name => {
       
           this.categories.map( cat => {
                  if(cat.name === name) {
                     this.subCat = cat.subCategories;
                  }
           } )
    } )
  }

}
