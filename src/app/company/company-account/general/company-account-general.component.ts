import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, ContentChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
// libs
import { Apollo } from "apollo-angular";
import { takeUntil } from "rxjs/operators";
import { graphqlCompanyAccount } from "../../../_shared/graphql/company-account";
// services
import { RegionService } from "../../../_shared/region.service";
import { GlobalUserProService } from "../../../_shared/services/global-user-pro.service";
import { AppModalComponent } from "src/app/_shared/components/app-modal/app-modal.component";
import { IGeneralInfo } from "./models/generalInfo.interface";
import { ICompanyPhone } from "./models/companyPhone.interface";
import { ICompanyEmail } from "./models/companyEmail.interface";
import { ICompanyWebsite } from "./models/companyWebsite.interface";
import { ILocation } from "src/app/_shared/models/company/location.interface";
import { Subject } from "rxjs";
import { NameComponent } from "./name/name.component";
import { GeneralInfoComponent } from "./general-info/general-info.component";
import { EmailComponent } from "./email/email.component";
import { CompanyAddressesComponent } from "./company-addresses/company-addresses.component";
import { CompanyPhoneComponent } from "./company-phone/company-phone.component";
import { WebsiteComponent } from "./website/website.component";

@Component({
  selector: "app-company-account-general",
  templateUrl: "./company-account-general.component.html",
  styleUrls: [
    "./company-account-general.component.scss",
    "../../../_shared/css/account_shared_style.scss"
  ]
})
export class CompanyAccountGeneralComponent implements OnInit {

  @ViewChild(NameComponent, { static: false }) name:NameComponent;
  @ViewChild(GeneralInfoComponent, { static: false }) general:GeneralInfoComponent;
  @ViewChild(EmailComponent, { static: false }) email:EmailComponent;
  @ViewChild(CompanyAddressesComponent, { static: false }) addresses:CompanyAddressesComponent;
  @ViewChild(CompanyPhoneComponent, { static: false }) phone:CompanyPhoneComponent;
  @ViewChild(WebsiteComponent, { static: false }) website:WebsiteComponent;


  destroy$:Subject<any> = new Subject<any>();
  companyID: any;
  company_info: any;
  ngTemplate: any;
  EdititemIndex: {
    email: number;
    phone: number;
    address: number;
    website: number;
  };
  deactivate:boolean = false;

  private querySubscription: any;
  //for change  Industry
  @ViewChild(AppModalComponent, { static: false }) modal: AppModalComponent;

  // for public url

  editURLForm: FormGroup;
  submittedEditURLForm: boolean = false;

  companyLocalstorage: any;

  generalInfo: IGeneralInfo = {
    companyId:null,
    foundation_date:null,
    industry:null,
    parking:0,
    size:0,
    type:0,
    business_hours:[]
  }; 
  companyPhones:ICompanyPhone[]     = [];
  companyEmails:ICompanyEmail[]     = [];
  companyWebsites:ICompanyWebsite = {
    company_id:null,
    websites: []
  };

  companyAddresses:ILocation[] = []
  isEditURL:boolean = false;
  url:string;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private regions: RegionService,
    private globalUserProfileService: GlobalUserProService
  ) {}

  ngOnInit() {

    this.ngTemplate = {
      publicUrl: false
    };


    this.companyLocalstorage = this.globalUserProfileService.getCompanyProfile();

    this.getCompanyAccount();


    this.editURLForm = this.formBuilder.group({
      url: ["", Validators.required]
    });

  }

  closeAllForm(type){

    let components = {
      name:this.name,
      general:this.general,
      email:this.email,
      addresses:this.addresses,
      phone:this.phone,
      website:this.website,
      url:null
    }


   let keys = Object.keys(components);

   keys.map(key => {
     if(key !== type){
        if(key === 'url'){
          return  this.isEditURL = false; 
        }
        components[key].isEdit ? 
         components[key].isEdit = false :
            components[key].isOpenForm = false , 
            components[key].isOpenEditForm = key === 'addresses' ?  false : {};
     }
   })
  }

  getResult(type:string){
    this.closeAllForm(type);
  }

  getCompanyAccount() {
    this.querySubscription = this.apollo
      .watchQuery({
        fetchPolicy:'network-only',
        query: graphqlCompanyAccount.getCompanyAccount,
        variables: {
          company_id: this.companyLocalstorage.id
        }
      })
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data }) => {
        this.company_info = data["GetCompanyAccount"];
        

        if(this.company_info){
          let companyId = this.company_info['id'];

          /// General info ///
          this.generalInfo.companyId = this.company_info['id'];
          this.generalInfo.industry =  this.company_info['industry'];
          this.generalInfo.foundation_date = this.company_info['foundation_date'];
          this.generalInfo.business_hours = this.company_info['business_hours'];
          this.generalInfo.parking = this.company_info['parking'];
          this.generalInfo.size = this.company_info['size'];
          this.generalInfo.type = this.company_info['type'];

          /// Phones /// 
          this.companyPhones = this.company_info['phones'];

          /// Emails /// 
          this.companyEmails = this.company_info['emails'];

          /// Addresses ///
          this.companyAddresses = this.company_info['addresses'];

          /// Websites ///
          this.companyWebsites.company_id = companyId;
          this.companyWebsites.websites = this.company_info['websites'];

          this.url = this.company_info['url'];
        }
      });
  }


  /*
  =============================================== 
  shortage for forms names
  =============================================== 
  */




  get edPUFo() {
    return this.editURLForm.controls;
  }



  editPURL() {
    this.submittedEditURLForm = true;

    let url: string = this.edPUFo.url.value;
    let input = {
      company_id: this.company_info.id,
      url: url
    };

    this.closeAllForm(null);


    if(this.editURLForm.valid &&  url !== this.url){

    this.apollo
      .mutate({
        mutation: graphqlCompanyAccount.changePURL,
        variables: input
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ data }) => {
          this.url = url;
          this.globalUserProfileService
              .updateCompanyProfile({
                url
              })
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
    }

    this.isEditURL = false;
  }

   deactivateAccount(){
        this.modal.title = 'Deactivate account';
        this.modal.open();
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
