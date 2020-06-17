import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { addRealEstate } from "../estate-form/models/add-estate.model";
import * as model  from '../../Shared/models/estate-model';


@Injectable({ providedIn: 'root' })
export class EstateFormService  {

  yleDato: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(new FormGroup({}));
  files: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  formInput: BehaviorSubject<addRealEstate> = new BehaviorSubject<addRealEstate>({});
  sumbitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
  dealTypeInput: BehaviorSubject<any> = new BehaviorSubject<any>({ });
  savedFiles: Subject<any> = new Subject<any>();

  dealType: FormGroup;
  home: FormGroup;
  addEstateForm: FormGroup;
  specsForm: FormGroup;
  exterior: FormGroup;
  interior: FormGroup;
  interior_exterior: FormGroup;
  deal_type_renovation: FormGroup;
  buildForm: FormGroup;
  totalArea: FormGroup;
  model = model;

  status: FormControl;
  information: FormControl;
  basicForm: FormGroup;
  date: FormGroup;
  hasReppositoryPropert: FormControl;
  hotelForm: FormGroup;
  layout:FormControl;
  buildingUse: FormControl;


  constructor(
    private fb: FormBuilder
  ) {
     // first estate form
     this.dealType = this.fb.group({
          deal_type: [ '', Validators.required ],
          property_type: [ '', Validators.required ],
          location: this.fb.group({
              city: ['', Validators.required],
              country_id: ['', Validators.required],
              street: [''],
              address: [''] 
          })
     })

     this.exterior = fb.group({
        price_type: ['', Validators.required],
        min_price: ['', Validators.required],
        max_price: ['', Validators.required],
        currency: [ '', Validators.required]
    })

    this.interior = fb.group({
        price_type: ['', Validators.required],
        min_price: ['', Validators.required],
        max_price: ['', Validators.required],
        currency: ['', Validators.required]
    })

    this.interior_exterior  = fb.group({
        price_type: ['', Validators.required],
        min_price: ['', Validators.required],
        max_price: ['', Validators.required],
        currency:  ['', Validators.required]
    });

    this.deal_type_renovation = fb.group({
        title: ['', Validators.required ],
        description: ['']
    });

    this.buildForm = fb.group({
        timing: ['Timing_is_flexible', Validators.required ],
        currency1: ['gold']
    });

    // forms for second page on navigation  
    this.specsForm = this.fb.group({
        badrooms: ['', Validators.required],
        bathrooms: ['', Validators.required],
        totalArea: ['', Validators.required ],
        metrics: ['', Validators.required],
        carSpecs: ['', Validators.required]
    });

    this.basicForm = fb.group({
         title: ['', Validators.required],
         house_rule:[''],
         description: [''],
         price: ['', Validators.required],
         currency: ['gold', Validators.required],
         enterPrice: ['', Validators.required],
         phones: this.fb.array([this.fb.group({
          number: ['', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
          country_code_id: ['', Validators.required ]
        })])
    });

    this.date = fb.group({
        dateFrom: ['', Validators.required ],
        dateTo:   ['', Validators.required ]
    });

    this.hotelForm = fb.group({
          rooms:  ['', Validators.required],
          total_area: ['', Validators.required],
          floor:  ['', Validators.required ],
          floors: ['', Validators.required],
          metrict_type: ['', Validators.required ]
    });
 
    this.status = new FormControl('', Validators.required);
    this.information = new FormControl('', Validators.required);
    this.hasReppositoryPropert = new FormControl(false , Validators.required);

    this.totalArea = fb.group({
         total_area: ['', Validators.required],
         metrict_type: ['', Validators.required]
    });

    this.buildingUse = new FormControl('', Validators.required );
    this.layout = new FormControl('', Validators.required );
    
   }
  
  isInvalid( selectedModel: any ): boolean {
    let isInvalid: boolean = false;
       for ( const model in selectedModel ) {
              selectedModel[model].filter( field => field.checked ).length === 0 ? isInvalid = true : null;
       }
    
    return !isInvalid;
  }
 
};
