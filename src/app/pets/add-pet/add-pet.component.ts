import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEALTYPE, COMPONENTSMODEL, CATEGORIES, FORMSMODEL } from '../models/model';
import * as COMPONENTS from './components';
import { AddPetService } from '../add-pet.service';
import { ServiceSliderComponent } from 'src/app/_shared/components/service-slider/service-slider.component';
import { FormControl } from '@angular/forms';
import { PetService } from '../pet.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
  providers: [{
    provide: AddPetService,
    useClass: AddPetService
  }]
})
export class AddPetComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef, static: false }) _container: ViewContainerRef;
  @ViewChild(ServiceSliderComponent, { static: false }) _slider: ServiceSliderComponent

  selelctedCategory: string;
  dealTypes: any[] = [];
  id: string;
  dealType: string;
  subCategories: any[] = [];
  files: any[] = [];
  FORMSMODEL = FORMSMODEL;
  key: any = {
    Category_Animals: 'animal', Category_Plants: 'plant',
    Category_FoodAccessories: 'food', Category_Seeds: "seed"
  };
  isPayment = false;
  foodCategoryCtrl: FormControl;
  isLoading: boolean = true;
   

  constructor(
    private activatedRoute: ActivatedRoute,
    private componentFactory: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef, 
    public petService: AddPetService,
    private editService: PetService,
    private router: Router,
    private fileUploadService: ImageUploadService
  ) {
    this.foodCategoryCtrl = petService.foodCategoryCtrl;
  }

  ngOnInit() {
       this.dealType = this.activatedRoute.snapshot.params['dealType'];
       this.id = this.activatedRoute.snapshot.params['id'];

       const editId = this.activatedRoute.snapshot.queryParams['id'];

       if( editId ) {
           this.petService.isEdit = true;
           this.petService.editId = editId;
       }
       
  }

  ngAfterViewInit() {
    this.addComponentsDynamic();
    if( this.petService.isEdit ) {
        this.edit();
    } 
    this.changeDetectorRef.detectChanges();
  }

  addComponents(SELECTEDMODEL: any[]) {
    if (SELECTEDMODEL && SELECTEDMODEL.length > 0) {
      SELECTEDMODEL.map(comp => {
        let _cp = this.componentFactory
          .resolveComponentFactory(COMPONENTS[comp]);
        if (this._container) {
          this._container.createComponent(_cp);
        }
      })
    } else {
      // IF SELECTED MODEL IS UNDEFINED OR EMPTY
    }
    console.log(this._container.length);
    
  }

  parseData() {
    let form;
    if (this.id === 'Category_FoodAccessories') {
      // if dealtype has subcategorriees 
      form = FORMSMODEL[this.id][this.dealType][this.petService.foodCategoryCtrl.value];
    } else {
      form = FORMSMODEL[this.id][this.dealType];
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (this.isFormValidInvalid(form) || this._slider.checkHasError() ||
      this.petService.information.invalid || this.petService.location.invalid) return this.petService.isSubmitted.next(true);

    this.isPayment = true;
    this._container.clear();
  };

  subCategorie(id: string) {
    this.subCategories = CATEGORIES;
  }

  handleSubCategories(sub: string) {
    if (this._container.length > 0) {
      this._container.clear();
    }
    const SELECTEDMODEL = COMPONENTSMODEL[this.id][this.dealType][sub];
    this.addComponents(SELECTEDMODEL);
  };

  getSlides(e: any) {
    const {_case} = e;
    if( _case === 'delete' ) {
      return  this.petService.deletedFiles.push(e['deletedId'])
    }
    this.files = e['slider'];
    this.petService.files = e['slider'] ;
  }

  isFormValidInvalid(form): boolean {
    for (let index = 0; index < form.length; index++) {
      if (this.petService[form[index]['formControl']]['invalid']) return true;

    }
    return false;
  }
  getMoney() {
    let SELECTEDMODEL;
    if (this.id === 'Category_FoodAccessories' && this.foodCategoryCtrl.value) {
      SELECTEDMODEL = COMPONENTSMODEL[this.id][this.dealType][this.foodCategoryCtrl.value];
    } else {
      SELECTEDMODEL = COMPONENTSMODEL[this.id][this.dealType];
    }
    this.addComponents(SELECTEDMODEL);
    this.isPayment = false;
    
  }
 

  addComponentsDynamic() {
    this.activatedRoute
    .params.subscribe(params => {
      const { id, dealType } = params;
      if (id && DEALTYPE[id]) {
        this.dealTypes = DEALTYPE[id];
        this.id = id;
      }
      if (this._container.length > 0) { this._container.clear() }; // Clear components on dealtype change  
      // Add components 
      if (id && dealType) {
        // DEAL TYPES WITH SUBCATEGORIES
        if (id === 'Category_FoodAccessories' && this.dealType) {
          this.subCategorie(this.dealType)
        }
        else if (this._container.length === 0) {
          const SELECTEDMODEL = COMPONENTSMODEL[id][dealType];
          this.addComponents(SELECTEDMODEL);
        }

      }
    });
  }

  edit() {   
    this.editService
        .getPetByID(this.petService.editId)
        .subscribe( data => {
              this.isLoading = false;
              const formsModel = FORMSMODEL[data['common']['category']][data['common']['deal_type']];
              const animalData = data[this.key[data['common']['category']]]; 
              formsModel.map((form) => {             
                    if( this.petService[form['formControl']] &&  animalData[form.func] ) { 
                        this.petService[form['formControl']].setValue(animalData[form.func]); 
                    }
              });
              this.petService
                  .location.setValue(data['common']['location']['country']);
              this.petService.setPhones(data['info']['phones']);
              this.petService.price.patchValue(data['common']['price']);
              this.petService.information
                  .get('detail').patchValue(data['info']['detail']);     
              const url = this.activatedRoute.snapshot.url;

              if( url.length === 1   ) {
                  this.router.navigate(['/pets', 'add-pet', data['common']['category'], data['common']['deal_type'] ], { queryParamsHandling:'merge' })
              }else if( data['common']['category'] === 'Category_FoodAccessorie' ) {
                    this.subCategories = CATEGORIES;
                    this.subCategorie(data['food']['food_category'])
              }
               this.petService.files = this.handleFilesEdit(data['common']['files']) ;
        });
  }
 

  handleFilesEdit( files: any[] ) {
  
    const filesForEdit: any[] = []; 
    
    let counter = -1;

    for (let index = 0; index < 9; index++) {
        if(  index % 3 === 0 ) {
            counter++;
             filesForEdit.push([]);         
          };

        if( files[index] &&  files[index]['address'] && files[index]['id'] ) {
            filesForEdit[counter].push( {img: files[index]['address'],  id:  files[index]['id'],  file: {}, type: files[index]['mime_type']  }) 
        } else {  filesForEdit[counter].push( {img: null,  id:  null,  file: {}  } ); }    
    } 

    return filesForEdit;
  
 };
  
}
 