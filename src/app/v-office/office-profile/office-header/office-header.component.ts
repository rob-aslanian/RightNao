import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OfficeService } from "src/app/_shared/services/v-office/office.service";
import { Iheader, Idescription } from "src/app/_shared/models/service/v-office/v-office-model";
import { FormControl } from "@angular/forms";
import { AppModalComponent } from "src/app/_shared/components/app-modal/app-modal.component";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs";
import { GlobalUserProService } from "src/app/_shared/services/global-user-pro.service";
import { takeUntil, map } from "rxjs/operators";
import { ImageUploadService } from "src/app/_shared/services/shared/image-upload.service";
import { AddImageComponent } from "src/app/_shared/components/add-image/add-image.component";
 

 

@Component({
  selector: "app-office-header",
  templateUrl: "./office-header.component.html",
  styleUrls: ["./office-header.component.scss"]
})



export class OfficeHeaderComponent implements OnInit ,OnDestroy {

  @ViewChild(AppModalComponent, { static: true }) _modal: AppModalComponent;

  @ViewChild( AddImageComponent , { static: false }) photoModal: AddImageComponent

  officeCntrl:     FormControl;
  modalType:       string;
  $destroy:        Subject<any> = new Subject<any>();
  isCompanyActive: boolean = false;
  isCompany:       boolean ;
  profilePath: string ;
  activeProfile:   string = '';
  $profileInfo:    Observable<any>;


  description: Idescription  = {
        company_id:  '',
        description: '',
        office_id:   ''
  };

 
  
  @Input() header: Iheader;
 

  constructor(
      private officeService: OfficeService,
      private route:         ActivatedRoute,
      private globalUserProService: GlobalUserProService,
      private imageUploadService: ImageUploadService,
    ) {
       this.officeCntrl = new FormControl(true);
  }


  get isMe() {   
      return this.header.isMe;
  }

 
 
  ngOnInit() {
       
         this.officeCntrl.setValue(this.header.isOut);

         this.activeProfile =   this.route.snapshot.params['type'];

         this.isCompanyActive = this.activeProfile  === 'user' ? false : true;

         
         const query: Observable<any> =  this.activeProfile === 'user' ? 
                                          this.officeService.getUserInfo( this.header.id ) :
                                          this.officeService.getCompanyInfo( this.header.id );

         this.profilePath = this.isCompanyActive ? 
                            "/company/profile/" : 
                            "/user/profile/";

  
      // Description
      this.description = {
          company_id:  this.globalUserProService.isCompanyActive() ? this.globalUserProService.getComapnyId() : undefined,
          description: this.header.description,
          office_id:   this.header.office_id
      }
                  
       this.$profileInfo =  query;
 
  }


  toggleOutOfVOffice(e: any) {

    const hasVofficeOpen =  this.officeCntrl.value;
    
    this.officeCntrl.markAsTouched();
 
    if ( !hasVofficeOpen ) {      
          e.preventDefault();
          this.modalType = "add";
          this._modal.title = "Out of v-Office";
          this._modal.open();
    } else {
        this.officeService.isOutOffice( this.header.office_id, false, '').subscribe( data => {
          this.header.return_date = '';
          this.header.isOut  = true ;
      })
    }
  }

  getResult(e: any) {

    const returnDate = e.day && e.month && e.year ?  `${e.day}-${e.month}-${e.year}` : '' ;

    this.officeService
    .isOutOffice( this.header.office_id, true, returnDate ).subscribe( data => {
          this.header.return_date = returnDate;
          this.header.isOut       = true;
          
      })
      this.officeCntrl.setValue(true);
      this._modal.close();
 
  }

  openModal( type: string ) {
      this.modalType = type;
      this._modal.open();
      this._modal.title = type;
  }

  changeDescription( value: string ) {
      this.header.description = value;
      this._modal.close();
  }

  getLanguages( e: any ) {

    const { addedLanguages } = e;

    if( e._case === 'add' ) {
         this.addLanguages(addedLanguages);
    }
    else if( e._case === 'edit' ) {

    const languagesToEdit = addedLanguages.filter( lang => lang.id );
    this.header.languages = [...languagesToEdit];

      if( e.deletedLanguages.length > 0 ) {
          this.officeService.removeVOfficeLanguages( this.header.office_id, e.deletedLanguages).pipe( 
             takeUntil( this.$destroy ) 
          ).subscribe();
      }

      if( e.addedLanguages.length > 0  ) {
          const languages = addedLanguages.filter( lang => !lang.id );
          this.addLanguages( languages );
      }

    this.officeService
    .changeVOfficeLanguages(this.header.office_id, addedLanguages ).subscribe(  )
          
    }

  this._modal.close();
  }

   

  addLanguages( languages: any[] ) {
    this.officeService
    .addVOfficeLanguages( this.header.office_id,  languages ).pipe( 
         takeUntil(this.$destroy) 
      ).subscribe( 
          ( langIds ) =>  languages.map(  (lang, i)  =>  this.header.languages.push({ id: langIds[i], language: lang.language, rank: lang.rank })
         )
       );
  }
  
 

  ngOnDestroy () {
     this.$destroy.next();
     this.$destroy.complete();
  }
 
  UploadImage() {

    const file = this.photoModal.getFile;
    
    if( !file['_fileFormData'] && !file['originImage'] && this.header.avatar  ) {
            this.officeService
            .removeVOfficePhoto( this.header.office_id ).subscribe( () => {
                  this.header.avatar  = '';
                  this.header.originAvatar = '';
            } )
    }
  
  
    if(  this.photoModal.getFile.file ) { 

      const formData: FormData = new FormData();
      const originImage: FormData = new FormData();

      originImage.append( 'file', this.photoModal.getFile.originImage );
      formData.append( 'file', this.photoModal.getFile.file );

          
          this.imageUploadService
          .uploadImageOffice( this.header.office_id, formData ).pipe(
            map( ({ info }) => info )
          )
          .subscribe( ( avatar  ) => { if( avatar && avatar.length > 0 && avatar[0]['url'])  this.header.avatar =  avatar[0]['url']  });

         if(this.photoModal.getFile.originImage) {
              this.imageUploadService
              .uploadImageOfficeOrigin( this.header.office_id, originImage ).pipe(
                  map( ({ info }) => info)
              ).subscribe( origin => { if( origin && origin.length > 0 &&  origin[0]['url'] ) this.header.originAvatar = origin[0]['url'] } );
         }

    }
    this._modal.close();

      
  }
}
