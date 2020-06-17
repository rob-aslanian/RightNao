import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CarsAddService } from '../cars-add.service';
import * as _compponents  from './index'
import { MainComponents, CarsForm } from '../../models/form,model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EstateFormService } from 'src/app/real-estate/add-estate/Service/estate-form.service';
import { CarsService } from '../../cars.service';

@Component({
  selector: 'app-cars-add-main',
  templateUrl: './cars-add-main.component.html',
  styleUrls: ['./cars-add-main.component.scss']
})
export class CarsAddMainComponent implements OnInit {
  form:FormGroup;
  files = [];
  action:string = 'add';

  @ViewChild('container' , { static:true ,  read:ViewContainerRef }) container:ViewContainerRef;


  constructor(
    private addService:CarsAddService,
    private carService:CarsService,
    private resolver:ComponentFactoryResolver,
    private route:Router,
    private activeRoute:ActivatedRoute,
    private sharedService:EstateFormService
  ) {
    this.form = new FormGroup({});
    this.files = this.addService.files.getValue();
    
   }

  ngOnInit() {
    this.addService.type.subscribe( type => {
      
      if(type) {
        this.addService.carAddForm.next(new CarsForm(type).generateMainForm());
        this.form = this.addService.carAddForm.value;
        
        this.dynamicInjectComponents(type);
        this.patchValue();
      }
    } )
  }

  dynamicInjectComponents(type){
    this.container.clear();
    const columns = MainComponents[type];

    columns.map(column => {
      const comp = this.resolver.resolveComponentFactory(_compponents[column]);
      const el:any = this.container.createComponent(comp);
      
      if (el.instance.form) {
         el.instance.form = this.addService.carAddForm.value;
      }

    })
  }

  getFiles( e: any ) {
    this.addService.files.next(e.slider);
    if(e['_case'] == 'delete' && this.action == 'edit' && e['deletedId']) {
      this.carService.removeVehiclePhotos(this.addService.carsEditObj['id'],[e['deletedId']])
                      .subscribe( data => console.log(data) )
    }
  }


  next(){
    this.form = this.addService.carAddForm.value;
    this.form.get('vehicleType').setValue(this.addService.type.value);
    
    if(this.addService.truckType.value) {
      this.form.get('truckType').setValue(this.addService.truckType.value);
    }
    
    if(this.form.invalid) {
      this.addService.isSubmitted.next(true);
      window.scrollTo({behavior: 'smooth', top: 0});
    } else {
      this.addService.isSubmitted.next(false);
      this.route.navigate([`cars/${this.action}/${this.addService.type.value.toLowerCase()}`]);
    }
    
    
  }
  back(){
    this.route.navigate(['cars/add']);
  }

  patchValue(){
    this.activeRoute.params.subscribe( data => {
      
      if(data['action']=='edit') {
        this.action = 'edit';
        let example = this.addService.carsEditObj;
        this.sharedService.savedFiles.next(example['files']);
        this.addService.carAddForm.value.patchValue({
          vehicleType: example['vehicleType'],
          brand: example['brand'],
          model: example['model'],
          trim: example['trim']
        })
      }
    })
  }



}
