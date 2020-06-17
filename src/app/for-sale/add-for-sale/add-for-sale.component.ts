import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { map, switchMap, merge } from 'rxjs/operators';
import { MAIN_CATEGORIES, SUB_CATEGORIES, CONDITION, PRICE } from '../models/model';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { ForSaleService } from '../for-sale.service';
import { ServiceSliderComponent } from 'src/app/_shared/components/service-slider/service-slider.component';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-add-for-sale',
  templateUrl: './add-for-sale.component.html',
  styleUrls: ['./add-for-sale.component.scss']
})
export class AddForSaleComponent implements OnInit , OnDestroy {

  @ViewChild(ServiceSliderComponent, {static:false}) _slider: ServiceSliderComponent;
  
  forSaleForm: FormGroup;
  isSubmitted: boolean = false;
  $destroy: Subject<any> = new Subject<any>();
  MAIN_CATEGORIES =  MAIN_CATEGORIES; 
  SUB_CATEGORIES =  SUB_CATEGORIES;
  CONDITION = CONDITION;
  PRICE = PRICE;
  $countryCodes: Observable<any>; 
  $listOfSubProducts: Observable<any>;
  $listOfCountries: Observable<any[]>;
  currency =  utilities.getAllCurency();
  isPayment: boolean = true;
  files: any[] = [];
  deletedFiles: any[] = [];
  isEdit: boolean = false;
  editId: string;
  isCommunity: boolean = false;

  constructor(
    private regionService: RegionService,
    private fb: FormBuilder,
    private chDetecRef: ChangeDetectorRef,
    private forSaleService: ForSaleService,
    private fileUploadService: ImageUploadService,
    private activatedRoute: ActivatedRoute,
    private globalProSer: GlobalUserProService,
    private router: Router

  ) { 
    this.isEdit = this.activatedRoute.snapshot.data['isEdit'];

    this.forSaleForm = this.fb.group({
          product: ['', Validators.required],
          category: ['Furniture & Interior'],
          sub_category: [''],
          condition: ['Condition_New'],
          price: fb.group({
              price_type: ['PriceType_AddPrice'],
              fix_price:  ['', Validators.required],
              min_price:  [0],
              max_price:  [0],
              currency:   ['HPC']
          }),
          expired_days: [20],
          post_currency: ['ALL'],
          detail:fb.group({
              title: ['', Validators.required],
              description: ['', Validators.required]
          }),
          phones:fb.array([ this.createPhoneForm() ]),
          location:fb.group({
              country_id: ['', Validators.required],
              city:fb.group({
                id: ['2808473'],
                city: ['']
              })
            }),
          pick_up: [false],
          delivery: [false]
    })
  }

  get saleCtrl() {
      return this.forSaleForm.controls;
  }

  ngOnInit() {
    this.isCommunity = this.activatedRoute.snapshot.data['isCommunity'] || false;
    console.log(this.isCommunity);
    
    if( this.isEdit ) {
         this.editId = this.activatedRoute.snapshot.params['id'];
         this.forSaleService
             .getForSaleByID(this.editId)
             .subscribe( data => {
                  this.forSaleForm.patchValue(data); 
                  const product = this.MAIN_CATEGORIES.find(prod => 
                       prod.toLocaleLowerCase().split(' ').join('_') === data.product
                  );
                 this.files = this.handleFilesEdit(data.files);
                 this.forSaleForm.get('product').setValue(product)
              } )
    }

    this.$countryCodes = this.regionService
                             .getListOfCountryCodes()
                             .pipe(map(({data}) => data['getListOfCountryCodes']) );

    this.$listOfCountries = this.regionService.getListOfCountries();
    this.$listOfSubProducts =  this.regionService.getListOfProducts();

    this.forSaleForm.get('price').valueChanges.subscribe( price => {
         console.log(price['price_type']);
         if( price['price_type'] === 'PriceType_AddPrice' ) {
            this.saleCtrl.price.get('fix_price').setValidators([Validators.required]);  
            this.saleCtrl.price.get('min_price').clearValidators();
            this.saleCtrl.price.get('max_price').clearValidators();   
         }else if(price['price_type'] === 'PriceType_PriceRange') {
            this.saleCtrl.price.get('min_price').setValidators([Validators.required]);
            this.saleCtrl.price.get('max_price').setValidators([Validators.required]);
            this.saleCtrl.price.get('fix_price').clearValidators();
         }else{
            this.saleCtrl.price.get('min_price').clearValidators();
            this.saleCtrl.price.get('max_price').clearValidators();
            this.saleCtrl.price.get('fix_price').setValidators([Validators.required]);  
         }
            this.forSaleForm.updateValueAndValidity();
            this.chDetecRef.detectChanges();      
    } )

  }
  
  addPhone() {
    (this.forSaleForm.get('phones') as FormArray)
         .push(new FormGroup({ number: new FormControl('', Validators.required ), country_code_id: new FormControl('', Validators.required ) }))
  };

  createPhoneForm(): FormGroup {
       return this.fb.group({
          country_code_id: ['', Validators.required ],
          number: ['', Validators.required ]
       })
  }

  submit() {  
    console.log(this.deletedFiles);
    
     this.isSubmitted = true;
     if( this.forSaleForm.invalid ||
         this._slider.checkHasError()) return window.scroll({top: 0, behavior: 'smooth'});

     const input = this.forSaleForm.value;

     input.phones = input.phones.map(phone => {
           return {
              country_code_id: +phone.country_code_id,
              number: phone.number.toString()
           }
     })

     const files = this.removeDimensions(this.files);
     
     const formData = new FormData();
     
     files.map((file) => { formData.append('file',file) });

     if( !this.isEdit ) {
       this.forSaleService
           .addForSale(input)
           .pipe(
             map(({data}) => data['AddForSale']['id']),
             switchMap((id) => this.fileUploadService
                                   .uploadImage(formData, id, 'for_sale') )
           )
           .subscribe( data => this.router.navigate(['/for-sale']));
     }else{
        this.forSaleService
            .editForSale({sale_id: this.editId, ...input, company_id: this.globalProSer.isCompanyActive( ) ? 
                                                                      this.globalProSer.getComapnyId() : undefined })
            .pipe(
              merge(
                this.fileUploadService.uploadImage(formData, this.editId, 'for_sale'),
                ...this.deletedFiles.map(id => this.forSaleService.removeForSaleFile(this.editId, id))
              )
            )
            .subscribe(data => this.router.navigate(['/for-sale']));
     }
 
  };

  toggleSubCategory(vl: string) {
       if(vl === 'Home and garden') {
            this.saleCtrl.sub_category.setValidators([Validators.required]);
       }else{
            this.saleCtrl.sub_category.clearValidators();
       }
       this.saleCtrl.sub_category.updateValueAndValidity();
  };

  getSlides(e: any) {
    const {_case} = e;
    if( _case === 'delete' ) {
        this.deletedFiles.push(e['deletedId'])
    }else {
      this.files = e['slider'];
      this.files = e['slider'] ;
    }
  }

 
  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
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
