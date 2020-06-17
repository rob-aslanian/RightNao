import { Component, 
         OnInit, 
         ComponentFactoryResolver, 
         ViewChild, 
         ViewContainerRef, 
         AfterViewInit 
       } from "@angular/core";

import { FormGroup, FormControl } from "@angular/forms";
import { components, propertTypes }  from '../../Shared/models/estate-model';

import * as _components from "./components";
import { ActivatedRoute } from "@angular/router";
import { EstateFormService } from "../Service/estate-form.service";
import { GlobalUserProService } from "src/app/_shared/services/global-user-pro.service";
 
 

@Component({
  selector: 'app-estate-form',
  templateUrl: './estate-form.component.html',
  styleUrls: ['./estate-form.component.scss'],
})


export class EstateFormComponent implements OnInit, AfterViewInit {

  @ViewChild( 'component', { static: false, read: ViewContainerRef } ) _container: ViewContainerRef; 

  form: FormGroup;
  catId: string = '';
  subCatId: string = '';
  propertTypes = propertTypes;
  companyId: any ;
  hasReppositoryPropert: FormControl;

  constructor(
        private componentFactoryResolver: ComponentFactoryResolver, 
        private activatedRoute: ActivatedRoute, 
        private estateFormService: EstateFormService, 
        private globalUserProService: GlobalUserProService
   ) { 
      this.companyId = globalUserProService.isCompanyActive() &&
                       globalUserProService.getComapnyId();
      this.hasReppositoryPropert = estateFormService.hasReppositoryPropert;
      
    }

  ngOnInit() {
        const params =   this.activatedRoute.snapshot.params;
        this.catId = params['catId'];
        this.subCatId = params['subCatId'];
    }

  ngAfterViewInit() { setTimeout(() => this.injectDynamicComponents() , 0 )  }
  

  injectDynamicComponents() {       
      const comp =  this.componentFactoryResolver
                        .resolveComponentFactory(_components[components[this.subCatId]]);
      this._container.createComponent(comp);

  }

  goBack(){
      history.back();
      window.scrollTo({behavior: 'smooth', top: 0});
  }

  logValue( ) {
        console.log(this.estateFormService.addEstateForm.value);
        
  }

  

}
