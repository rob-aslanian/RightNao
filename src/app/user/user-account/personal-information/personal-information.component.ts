import { Component, OnInit, TemplateRef , OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { auditTime, switchMap, filter, debounceTime, distinctUntilChanged, map, takeUntil, take } from 'rxjs/operators';
import AbrName from '../../../../assets/data/en/countries';

import { graphqlUserAccount } from '../../../_shared/graphql/user-account';

// services
import { RegionService } from '../../../_shared/region.service';
import { utilities } from '../../../_shared/utilities/utilities';
import { Observable, Subject, pipe } from 'rxjs';
import { graphqlShared } from '../../../_shared/graphql/shared/base-data';
import { UserAccountService } from 'src/app/_shared/services/user/user-account.service';
import {  MONTHS, Years , Days } from 'src/app/_shared/models/date.model';
import { PasswordValidation } from 'src/app/_shared/register.validator';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss', '../../../_shared/css/account_shared_style.scss']
})
export class PersonalInformationComponent implements OnInit, OnDestroy {


  $destory:Subject<any> = new Subject<any>();

  editaddressID: any;

  isAddressPrimary = {};
  toggle: any = {
    selected: "",
    active: []
  }
  
  scrollTo: string;
  myConnections: any[];
  private querySubscription: any;
  cityTypeahead:any;
  addressCountry:string;
  countryCodes: { id: string, country: string, country_code: string }[] = [];

  countries: { asc: string, name: string }[];
  cities: { id: string, city: string, subdivision: string, country: string }[];

  user_info: any;
  //get all list of languages
  languages: any;
  years_arr = [];
  edit_object: any;

  //for change first name
  firstNameForm: FormGroup;
  submittedFirstNameForm: boolean = false;

  //for change father name
  fatherNameForm: FormGroup;
  submittedFatherNameForm: boolean = false;

  //for change middle name
  middleNamesForm: FormGroup;
  submittedMiddleNameForm: boolean = false;

  //for change last name
  lastNamesForm: FormGroup;
  submittedLastNameForm: boolean = false;

  //for change nick name
  nickNameForm: FormGroup;
  submittedNickNameForm: boolean = false;

  //for change birthday
  birthDayForm: FormGroup;
  submittedbirthDayForm: boolean = false;

  //for change gender
  genderForm: FormGroup;
  submittedGenderForm: boolean = false;

  //for add Email
  addEmailForm: FormGroup;
  submittedaddEmailForm: boolean = false;

  //for edit Email
  editEmailForm: FormGroup;
  submittededitEmailForm: boolean = false;

  //for add Email
  addPhoneForm: FormGroup;
  submittedaddPhoneForm: boolean = false;

  //for edit Email
  editPhoneForm: FormGroup;
  submittededitPhoneForm: boolean = false;

  //for add Address 
  addAddressForm: FormGroup;
  submittedaddAddressForm: boolean = false;

  //for add Address 
  editAddressForm: FormGroup;
  submittededitAddressForm: boolean = false;

  //for add Language 
  editLanguageForm: FormGroup;
  submittededitLanguageForm: boolean = false;
  utils = utilities;
  

  //birthday
  days = Days;
  Months = MONTHS
  end = Years;

  connections = [
    {
      id: "my_connections",
      name: "My Connections",
    },
    {
      id: "members",
      name: "Public",
    },
    {
      id: "me",
      name: "Only Me",
    },

  ];

  //Languages:
  //dropdownListLanguages = [];
  dropdownSettingsLanguages: any = {};

  constructor(
    private formBuilder: FormBuilder, 
    private apollo: Apollo, 
    private region: RegionService,
    private userAccount:UserAccountService
    ) {
            //form add first name
    this.firstNameForm = this.formBuilder.group({
      name: ['',Validators.required],
    });

    //form add father name
    this.fatherNameForm = this.formBuilder.group({
      name: ['', PasswordValidation.detectLanguageDashSpace()],
      connections: ['']
    });

    this.middleNamesForm = this.formBuilder.group({
      name: ['',  PasswordValidation.detectEnglishDashSpace()],
      connections: ['']
    });

    this.lastNamesForm = this.formBuilder.group({
      name: ['',  Validators.compose([Validators.required,PasswordValidation.detectIfhasNumber()])]
    });


    this.nickNameForm = this.formBuilder.group({
      name: ['',PasswordValidation.detectEnglishDashSpace()],
      connections: ['']
    });

    this.birthDayForm = this.formBuilder.group({
      // day: ['', Validators.required],
      // month: ['', Validators.required],
      // year: ['', Validators.required],
      connections: ['']
    });

    this.genderForm = this.formBuilder.group({
      // gender: ['', Validators.required],
      connections: ['', Validators.required]
    });

    this.addEmailForm = this.formBuilder.group({
      email: ['',  Validators.compose([Validators.required,Validators.email])],
      connections: [this.connections[0].id, [Validators.required]]
    });



    this.editEmailForm = this.formBuilder.group({
      id: [''],
      email: [{ value: '', disabled: true }],
      connections: ['', Validators.required],
      primary: ['']
    });

    this.addPhoneForm = this.formBuilder.group({
      country_code: ['', Validators.required],
      number: ['', Validators.compose([Validators.required,PasswordValidation.detectNumber()])],
      connections: [this.connections[0].id, [Validators.required]]
    });

    this.editPhoneForm = this.formBuilder.group({
      id: [''],
      number: [{ value: '', disabled: true }],
      connections: ['', Validators.required],
      primary: [''],
      country_code: ['', Validators.required]
    });

    this.addAddressForm = this.formBuilder.group({
      name: ['', Validators.required],
      fname: [''],
      lname: [''],
      street_address: [''],
      apartment: [''],
      city_code: ['', Validators.compose([Validators.required,PasswordValidation.detectIfhasNumber()])],
      zip: ['', Validators.compose([ Validators.required , Validators.pattern('[0-9]+') ])],
      country: ['',Validators.required],
    });

    this.editAddressForm = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required],
      fname: ['', Validators.compose([Validators.required,PasswordValidation.detectIfhasNumber()])],
      lname: ['', Validators.compose([Validators.required,PasswordValidation.detectIfhasNumber()])],
      street_address: ['', Validators.required],
      apartment: ['', Validators.required],
      city_code: ['',Validators.compose([Validators.required,PasswordValidation.detectIfhasNumber()])],
      zip: ['', Validators.compose([ Validators.required , Validators.pattern('[0-9]+') ])],
      country: ['',Validators.required],
      primary: [''],
    });

    this.editLanguageForm = this.formBuilder.group({
      language: ['', Validators.required],
    });


    

   }
 
 
  ngOnInit() {
       this.fatherNameForm.controls.name.valueChanges.subscribe(data => {         
             this.checkIfFieldIsEmpty('fatherNameForm',data)
       })
       this.middleNamesForm.controls.name.valueChanges.subscribe(data => {         
        this.checkIfFieldIsEmpty('middleNamesForm',data)
      })
      this.nickNameForm.controls.name.valueChanges.subscribe(data => {         
        this.checkIfFieldIsEmpty('nickNameForm',data)
      })



    this.querySubscription = this.apollo.watchQuery({
      fetchPolicy: "network-only",
      query: graphqlUserAccount.getUserAccount,
    }).valueChanges.subscribe
      ((data: any) => {

        this.user_info = data.data;
        console.log(this.user_info.getAccount.phone);
        
        let address = this.user_info['getAccount']['my_address'];
        // generate day month and year of birthday
        let birthday = this.user_info['getAccount']['birthday'];
        let splitedBirthday = birthday['birthday'].split("-");
        birthday['day'] = parseInt(splitedBirthday[0]);
        birthday['month'] = parseInt(splitedBirthday[1]);
        birthday['year'] = parseInt(splitedBirthday[2]);


        if(address && address.length > 0){
          address.map(addr => addr.primary ? this.isAddressPrimary[addr.id] = true : null );
        }


        console.log(this.user_info);
      });

    this.languages = this.region.getListOfLanguages();


    this.getCountries();


    //get list of counteries codes 
    this.region
      .getListOfCountryCodes()
      .pipe(takeUntil(this.$destory))
      .subscribe(({ data }) => {
        this.countryCodes = data['getListOfCountryCodes']; 
      });


    this.dropdownSettingsLanguages = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      //selectAllText: 'Select All',
      //unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      //limitSelection: null
    };

  }
  myToggle(index, item?: any , container?) {

    /// Reset forms ///
    this.addEmailForm.controls['email'].reset();

    // this.addPho['country_code'].reset();
    this.addPho['number'].reset();

    this.addAddressForm.reset();
    this.addAddressForm.get('country').setValue('')
    this.submittedaddPhoneForm = false;
    this.submittedaddEmailForm = false;

    this.toggle['active'][index] = !this.toggle['active'][index];

    if(this.toggle['active'][index] && container){
       utilities.scrollIntoView(document.getElementById(container));
    }

    if (this.toggle["selected"] != index) {

      this.toggle['active'][this.toggle["selected"]] = false;
      
    }
    this.toggle["selected"] = index;

    if (item) {
      console.log(item);
      this.editDropDown(index, item);
    }

  }
  
  checkIfFieldIsEmpty(type:string,inputStr:string){    
       switch (type) {
         case 'fatherNameForm':{

                if(inputStr.length > 0){
                     this.fatherNameForm.get('connections').enable();
                 }
                  else{
                     this.fatherNameForm.get('connections').disable();
                 }
            }
           break;
        case 'middleNamesForm':{

               if(inputStr.length > 0){
                     this.middleNamesForm.get('connections').enable();
               }
                else{
                     this.middleNamesForm.get('connections').disable();
                }
           }
           break;
      case 'nickNameForm':{

               if(inputStr.length > 0){
                     this.nickNameForm.get('connections').enable();
              }
               else{
                     this.nickNameForm.get('connections').disable();
                }
            }
         default:
           break;
       }

  }
  // Get List of Country
  getCountries() {
    this.region.getListOfCountries().subscribe(data => {
      this.countries = data;

      this.countries.map(country => {
        if(AbrName[country['name']]){
          country['name'] = AbrName[country['name']];
        }
        
      });

    this.countries.sort((a,b) => b['name'] < a['name'] ? 1 : -1);
    });
  }
  
  selectCountry(e){
    let value = e.target.value;

    if(!!value){
        this.addressCountry = value;
    }
    this.addAddressForm.get('city_code').enable();
  } 
  // Search City
  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term , city) =>  this.getCities(term) )
    )
  cityFormatter = (result: any) => result.city;
  


    getCities(term) {
      
      if (!this.addressCountry || !this.cityTypeahead) return;
      
      if(this.addressCountry === null && this.cityTypeahead === null) return;


      let city = this.cityTypeahead !== null ? 
                 this.cityTypeahead.city || this.cityTypeahead : '';
  
  
     if(city !== ''){
  
      return this.region
                 .getCities(this.addressCountry ,city)
                 .pipe(
                   map(({data}) => data['getListOfCities']),
                   filter(cities => {
                     return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                   })
                  )
     }

    }


  mySingleToggle(index) {
    this.toggle['active'][index] = true;
    if (this.toggle["selected"] != index) {
      this.toggle['active'][this.toggle["selected"]] = false;
    }.0
    this.toggle["selected"] = index;
  }

  closeActiveToggle() {
    this.toggle['active'][this.toggle["selected"]] = false;
  }

  editDropDown(type: string, item: any) {
    this.editaddressID = item;
    switch (type) {

             
      case "firstName":
        this.firstNameForm.patchValue({
          name: item.firstname
        });
        break;

      case "fatherName":
        this.fatherNameForm.patchValue({
          name: item.patronymic,
          connections: item.permission.type
        });
        break;

      case "middleName":
        this.middleNamesForm.patchValue({
          name: item.middlename,
          connections: item.permission.type
        });
        break;

      case "lastName":
        this.lastNamesForm.patchValue({
          name: item.lastname
        });
        break;

      case "nickName":
        this.nickNameForm.patchValue({
          name: item.nickname,
          connections: item.permission.type
        });
        break;

      case "birthDay":
        this.birthDayForm.get('connections').setValue(
              item
        );
        break;

      case "editEmail":
        this.editEmailForm.controls['email'].setValue(item.email);
        this.editEmailForm.controls["connections"].setValue(item.permission.type);
        this.editEmailForm.controls["id"].setValue(item.id);
        this.editEmailForm.controls["primary"].setValue(item.primary);
        break;

      case "editPhone":
        this.editPhoneForm.controls["id"].setValue(item.id);
        this.editPhoneForm.controls['number'].setValue(item.number);
        this.editPhoneForm.controls["connections"].setValue(item.permission.type);
        this.editPhoneForm.controls["primary"].setValue(item.primary);
        this.editPhoneForm.controls["country_code"].setValue(item.country_code);
        break;

      case "editAddress":
        console.log(item);
        
        this.editAddressForm.controls['id'].setValue(item.id);
        this.editAddressForm.controls["name"].setValue(item.name);
        this.editAddressForm.controls["fname"].setValue(item.firstname);
        this.editAddressForm.controls["lname"].setValue(item.lastname);
        this.editAddressForm.controls["street_address"].setValue(item.street);
        this.editAddressForm.controls["apartment"].setValue(item.apartment);
        this.editAddressForm.controls["zip"].setValue(item.zip);
        // this.editAddressForm.controls["primary"].setValue(item.primary);
        this.editAddressForm.controls["country"].setValue(item.country_id);
        this.editAddressForm.controls["city_code"].setValue(item.city);

        this.cityTypeahead = item.city;
        this.addressCountry = item.country_id;

        utilities.scrollIntoView(document.getElementById('addAddress'));

        break;
        case 'gender':
             this.genderForm.get('connections').patchValue(item)
             console.log(this.genderForm.get('connections').value);
             
          

        break;
      default:
        console.log(type + " this type doesn't exist");
        break;
    }

  }

  /*
  =============================================== 
  shortage for forms names
  =============================================== 
  */

  get fnFo() { return this.firstNameForm.controls; }

  get fatnFo() { return this.fatherNameForm.controls; }

  get midFo() { return this.middleNamesForm.controls; }

  get laFo() { return this.lastNamesForm.controls; }

  get nickFo() { return this.nickNameForm.controls; }

  get birthFo() { return this.birthDayForm.controls; }

  get genFo() { return this.genderForm.controls; }

  get addemFo() : any { return this.addEmailForm.controls; }

  get editemFo() { return this.editEmailForm.controls; }

  get addPho() : any { return this.addPhoneForm.controls; }

  get editPho() { return this.editPhoneForm.controls; }

  get addAdd() { return this.addAddressForm.controls; }

  get editAdd() { return this.editAddressForm.controls; }

  get editLang() { return this.editLanguageForm.controls; }

  /*
  =============================================== 
  End of shortage for forms names
  =============================================== 
  */

  //change First Name
  changeFirstName() {

    this.submittedFirstNameForm = true;
    if (this.firstNameForm.invalid) {
      return;
    }

   let firstName  =   this.fnFo.name.value

     this.userAccount.changeFirstName(firstName)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log(data);
      this.user_info.getAccount.firstname = this.fnFo.name.value;
      this.closeActiveToggle();
    })
  }

  //change Father Name
  changeFatherName() {
    console.log(this.fatherNameForm);
    this.submittedFatherNameForm = true;

    if (this.fatherNameForm.invalid) {
      console.log("return error");
      return;
    }

    let input = {
        "patronymic": this.fatnFo.name.value,
        "permission": {
          "type": this.fatnFo.connections.value
        }
    };

    this.userAccount
    .changeFatherName(input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log(data);
      this.user_info.getAccount.patronymic.patronymic = this.fatnFo.name.value;
      this.user_info.getAccount.patronymic.permission.type = this.fatnFo.connections.value;
      this.closeActiveToggle();
    })

  }

  //change middle name
  changeMiddleName() {

    this.submittedMiddleNameForm = true;
    if (this.middleNamesForm.invalid) {
      return;

    }

    let input = {
        "middlename": this.midFo.name.value,
        "permission": {
          "type": this.midFo.connections.value
        }
    };

    this.userAccount.changeMiddleName(input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log('data from server', data);
      this.user_info.getAccount.middlename.middlename = this.midFo.name.value;
      this.user_info.getAccount.middlename.permission.type = this.midFo.connections.value;
      this.closeActiveToggle();


    })
  }

  //change last name
  changeLastName() {

    this.submittedLastNameForm = true;
    if (this.lastNamesForm.invalid) {
      return;
    }
    let lastName  = this.laFo.name.value;
    this.userAccount.changeLastName(lastName)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {

      console.log(data);
      this.user_info.getAccount.lastname = this.laFo.name.value;
      this.closeActiveToggle();

    })
  }

  //change nick name
  changeNickName() {
    if(Number(this.nickNameForm.get('name').value)){
               this.nickNameForm.get('name').setErrors({'exist': true })
    }
   
    this.submittedNickNameForm = true;
    if (this.nickNameForm.invalid) {
      return;
    }

    let input = {
        "nickname": this.nickFo.name.value,
        "permission": {
          "type": this.nickFo.connections.value
        }

    };

    this.userAccount.changeNickName(input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log(data);
      this.user_info.getAccount.nickname.nickname = this.nickFo.name.value;
      this.user_info.getAccount.nickname.permission.type = this.nickFo.connections.value;
      this.closeActiveToggle();
      });
  }

  //change birth date 
  changeBirthDate() {

    this.submittedbirthDayForm = true;
 

    let input = {
        "permission": {
          "type": this.birthFo.connections.value
      }
    };

    this.userAccount
     .changeBirthday(input)
     .pipe(takeUntil(this.$destory))    
     .subscribe(({ data }) => {
      console.log( data);
      this.user_info.getAccount.birthday.permission.type = this.birthFo.connections.value;
      this.closeActiveToggle();
    });
  }


  isCorrectDate(year, month, day) {
    let date = new Date(year, --month, day);


    if (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day) {
      this.birthDayForm.get('day').setErrors(null);
      return true;
    }

    this.birthDayForm.get('day').setErrors({ notCorrectDate: 'in-valid' });
    return false;

  }

  //change gender
  changeGender() {
   console.log(this.genFo.connections.value);
   
    // this.submittedGenderForm = true;
 
    let input = {
        "permission": {
          "type": this.genFo.connections.value
        }
    };
     this.userAccount
     .changeGender(input)
     .pipe(takeUntil(this.$destory))
     .subscribe(({ data }) => {
      console.log(data);

      this.user_info.getAccount.gender.permission.type = this.genFo.connections.value;
      this.closeActiveToggle();
      // this.ngTemplate.Gender = false; 
    }
    );
  }

  //add Email
  addEmail(event) {
    
    this.submittedaddEmailForm = true;
    if (this.addEmailForm.invalid) {
      event.target.disabled = false;
      return;
    }

    let input = {
        "email": this.addemFo.email.value,
        "permission": {
          "type": this.addemFo.connections.value
        }

    };

    
    this.userAccount
    .addEmail(input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data}) => {
      console.log( data);

      this.user_info.getAccount.email.push({
        "id":data['AddEmail'].id,
        "email": input.email,
        "permission": {
          "type": input.permission.type
        },
        show: false
      });
      event.target.disabled = false;
      this.closeActiveToggle();

    },
     (error) => {
        this.addEmailForm.get('email').setErrors({email:true})

     }
    );
  }
  makeEmailPrimary(emailId:string):void{
          
          this.userAccount
               .makeEmailPrimary({
                    id:emailId,
                    primary:true
               })
               .pipe(takeUntil(this.$destory))
                 .subscribe(data => {
                        this.user_info['getAccount']['email'].map((email,res) => {
                              if(email.id === emailId){
                                this.user_info['getAccount']['email'][res].primary = true;
                              }
                              else{
                                this.user_info['getAccount']['email'][res].primary = false;   

                              }
                        })        
                  })
              
        
      


}
  //edit Email
  editEmailFun(event) {
    event.target.disabled = true;

    this.submittededitEmailForm = true;
    if (this.editEmailForm.invalid) {
      event.target.disabled = false;
      return;
    }

    let input = {
       "id": this.editemFo.id.value,
        "permission": {
          "type": this.editemFo.connections.value
        },
        "primary": (this.editemFo.primary.value) ? true : false
    };

    console.log(input);
     this.userAccount
     .changeEmail(input)
     .pipe(takeUntil(this.$destory))
     .subscribe(({ data }) => {
      console.log('data from server', data);


      let items = this.user_info.getAccount.email;
      let index = items.findIndex(itm => itm.id == this.editemFo.id.value);
      items[index].permission.type = input.permission.type;
      items[index].primary = input.primary;
      items[index].show = false;
      this.closeActiveToggle();
      event.target.disabled = false;

    }
    );
  }

  //delete Email
  deleteEmailFun(event, id) {
    event.target.disabled = true;

     this.userAccount
     .removeEmail(id)
     .pipe(takeUntil(this.$destory)) 
     .subscribe(({ data }) => {
      console.log( data);
      let items = this.user_info.getAccount.email;
      let index = items.findIndex(itm => itm.id == id);
      items.splice(index, 1);
      event.target.disabled = false;
      this.closeActiveToggle();

    });

  }

  //add phone
  addPhoneFun(event) {
 
    this.submittedaddPhoneForm = true;
    if (this.addPhoneForm.invalid) {
      event.target.disabled = false;
      return;
    }

    let input = {
        "country_code_id": Number(this.addPho.country_code.value),
        "number": String(this.addPho.number.value),
        "permission": {
          "type": this.addPho.connections.value
        }
    }; 

    this.userAccount
     .addPhone(input)
     .pipe(takeUntil(this.$destory))
     .subscribe(({ data }) => {
      console.log(data);
  
      let country_code_id = String(input.country_code_id);
      let country_code = this.countryCodes.find(item => item.id == country_code_id);

      this.user_info.getAccount.phone.push({
        "id":data['AddPhone'].id,
        "country_code": country_code.country_code,
        "number": input.number,
        "permission": {
          "type": input.permission.type
        },
        show: false
      });
      this.closeActiveToggle();


    }, (error) => {
      this.addPho['number'].setErrors({ phone: true });
    });
  }
  makePhonePrimary(phoneId:string):void{
    this.userAccount.makePhonePrimary({
       id:phoneId,
       primary:true
    })
    .pipe(takeUntil(this.$destory))
       .subscribe(data =>{
          this.user_info['getAccount']['phone'].map((phone,res) => {
                  if(phone.id === phoneId){
                      this.user_info['getAccount']['phone'][res].primary = true;
                  }
                  else{
                    this.user_info['getAccount']['phone'][res].primary = false;
                  }

          })    
        })
           
  }

  //edit phone
  editPhoneFun(event) {

    event.target.disabled = true;

    this.submittededitPhoneForm = true;
    if (this.editPhoneForm.invalid) {
      event.target.disabled = false;
      return;
    }

    let input = {

        "id": this.editPho.id.value,
        "permission": {
          "type": this.editPho.connections.value
        },
        "primary": (this.editPho.primary.value) ? true : false


    };
      this.userAccount
     .editPhone(input)
     .pipe(takeUntil(this.$destory))
     .subscribe(({ data }) => {
      console.log(data);

      let items = this.user_info.getAccount.phone;
      let index = items.findIndex(itm => itm.id == this.editPho.id.value);
      items[index].permission.type = input.permission.type;
      items[index].primary = input.primary;
      items[index].show = false;

      event.target.disabled = false;
      this.closeActiveToggle();

    }, (error) => {
      console.log( error);
      event.target.disabled = false;
    });

  }

  //delete phone
  deletePhoneFun(event, id) {
    event.target.disabled = true;
    console.log(id);
    this.userAccount.deletePhone(id)
     .pipe(takeUntil(this.$destory))
     .subscribe(({ data }) => {
      console.log( data);

      let items = this.user_info.getAccount.phone;
      let index = items.findIndex(itm => itm.id == id);
      items.splice(index, 1);

      event.target.disabled = false;
      this.closeActiveToggle();

    }, (error) => {
      console.log('there was an error sending the query', error);
      event.target.disabled = false;
    });

  }

  // add address
  addAddressFun(event) {
    event.target.disabled = true;


    this.submittedaddAddressForm = true;
    if (this.addAddressForm.invalid) {
      console.log("return error");
      event.target.disabled = false;
      return;
    }

    let input =
      {

          "name": this.addAdd.name.value,
          "firstname": this.addAdd.fname.value,
          "lastname": this.addAdd.lname.value,
          "apartment": this.addAdd.apartment.value,
          "street": this.addAdd.street_address.value,
          "zip": String(this.addAdd.zip.value),
          "location": {
            "country_id": this.addAdd.country.value,
            "city":this.addAdd.city_code.value,

        }
      }
      ;
    console.log(input);
    this.userAccount.
    addAddress(input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      this.user_info.getAccount.my_address.push({
        "id":data.AddMyAddress.id,
        "name": this.addAdd.name.value,
        "firstname": this.addAdd.fname.value,
        "lastname": this.addAdd.lname.value,
        "apartment": this.addAdd.apartment.value,
        "street": this.addAdd.street_address.value,
        "zip": String(this.addAdd.zip.value),
        "country_id": this.addAdd.country.value,
        "city":this.addAdd.city_code.value,
      });

      event.target.disabled = false;
      this.closeActiveToggle();
      this.cityTypeahead = '';
      this.submittedaddAddressForm = false;

    }, (error) => {
      console.log('there was an error sending the query', error);
      event.target.disabled = false;
    });
  }

  //edit address
  editAddressFun(event) {

    event.target.disabled = true;
    console.log("we are here");

    this.submittededitAddressForm = true;
    if (this.editAddressForm.invalid) {
      console.log("return error");
      event.target.disabled = false;
      return;
    }


    let input =
      {
        "name": this.editAdd.name.value,
        "firstname": this.editAdd.fname.value,
        "lastname": this.editAdd.lname.value,
        "apartment": this.editAdd.apartment.value,
        "street": this.editAdd.street_address.value,
        "zip": this.editAdd.zip.value,
        "primary": this.editaddressID.primary,
        "location": {
          "country_id": this.editAdd.country.value,
          "city":  this.editAdd.city_code.value
        }
      };


    this.userAccount
    .editAddress(this.editAdd.id.value,input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log(data);
      let items = this.user_info.getAccount.my_address;
      console.log(items);
      let index = items.findIndex(itm => itm.id == this.editAdd.id.value);

      items[index].name = input.name;
      items[index].firstname = input.firstname;
      items[index].lastname = input.lastname;
      items[index].apartment = input.apartment;
      items[index].street = input.street;
      items[index].zip = input.zip;
      items[index].primary = input.primary;
      items[index].country_id = input.location.country_id;
      items[index].city = input.location.city;

      event.target.disabled = false;
      this.closeActiveToggle();

    }, (error) => {
      console.log('there was an error sending the query', error);
      event.target.disabled = false;
    });

  }

  makePrimaryAddress(id:string){
    let input = {
      "name": this.editAdd.name.value,
      "firstname": this.editAdd.fname.value,
      "lastname": this.editAdd.lname.value,
      "apartment": this.editAdd.apartment.value,
      "street": this.editAdd.street_address.value,
      "zip": this.editAdd.zip.value,
      "location": {
        "country_id": this.editAdd.country.value,
        "city":  this.editAdd.city_code.value
      },
      "primary":true
    }  
   

    this.userAccount.editAddress(id,input)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      this.isAddressPrimary = {};
      this.isAddressPrimary[id] = true;
    })
  }

  //delete address
  deleteAddressFun(event, id) {
    event.target.disabled = true;
    console.log(id);
    this.userAccount
    .deleteAddress(id)
    .pipe(takeUntil(this.$destory))
    .subscribe(({ data }) => {
      console.log('data from server', data);

      let items = this.user_info.getAccount.my_address;
      let index = items.findIndex(itm => itm.id == id);
      items.splice(index, 1);

      event.target.disabled = false;
      this.closeActiveToggle();

    }, (error) => {
      console.log('there was an error sending the query', error);
      event.target.disabled = false;
    });

  }
    getPhoneAbbr( phoneId? : string ) {
      let   countryId = this.countryCodes
            .filter( phone =>   phone['country_code'] ===  phoneId ? phone['country'] : null ) 

    
  
        return countryId && countryId[0] ? countryId[0].country : null 
      
    }
  
  ngOnDestroy(){
    this.$destory.next();
    this.$destory.complete();
  }

}
