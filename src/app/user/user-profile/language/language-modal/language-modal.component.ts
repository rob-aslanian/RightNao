import { Component, OnInit, Output, EventEmitter, Input,OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegionService } from 'src/app/_shared/region.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { Ilanguage } from 'src/app/_shared/models/user/language.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss']
})

export class LanguageModalComponent implements OnInit,OnDestroy {
  
  $destroy:Subject<any> = new Subject<any>();

  @Output() result:EventEmitter<Object> = new EventEmitter<Object>();
  @Input() data:Ilanguage

  @Input() currentLangs:string[];
   

  addLanguageForm:FormGroup;
  Languages: any[];
  currentRate:number = 0;
  submitedFormLanguage:boolean = false;
 
  constructor(
    private fb:FormBuilder,
    private region:RegionService,
    private userService:UserProfileService
  ) {

    this.addLanguageForm = this.fb.group({
      language_id: ["", Validators.required]
    });
  
   }

  ngOnInit() {

    console.log(this.currentLangs);
    
  
    this.Languages = this.region.getListOfLanguages();
    // edit languages

     if(this.data){
      this.addLanguageForm
      .setValue({
        language_id:this.data.language,
      }   
    )
     this.currentRate = this.data.rate
    }
    
  }

   get LangForm(){
        return this.addLanguageForm.controls

   }


   checkIfLangExist() : boolean {
      return this.currentLangs
                 .some(el => el === this.LangForm.language_id.value)
   }


  addLanguages(type){
    
    this.submitedFormLanguage = true;

    if(this.checkIfLangExist()){
      this.addLanguageForm
          .get('language_id')
          .setErrors({ notUnique:true })

    } else {
      this.addLanguageForm
          .get('language_id')
          .setErrors({ notUnique:null })

      this.addLanguageForm
          .get('language_id')
          .updateValueAndValidity()
    }




    if(this.addLanguageForm.invalid){
           return;
    }

     let language_id  = this.addLanguageForm.controls.language_id.value;

     let input = {
          language_id:language_id,
          rank:this.currentRate?this.currentRate:0
     }
     //get lang name 

    let Language =  this.Languages.filter(lang => {
        if(lang.item_id === language_id){
          return lang;
            }
        })     

         this.userService
         .addLanguage(input).pipe(takeUntil(this.$destroy))
         .subscribe(({data}) => {
              this.result.emit(
                   {
                    id:data['AddKnownLanguage'].id,
                    language:Language[0].item_id,
                    rate:this.currentRate,
                    _type:type
                  } 
              );
              this.currentRate = 0;
         })
         if(type === 'saveAndAdd'){
          this.addLanguageForm.reset();
          this.submitedFormLanguage = false;
         }
     
  }


  editLanguage(editType:string):void{
       if(editType === 'remove'){
             this.userService
              .removeLanguage(this.data.id).pipe(takeUntil(this.$destroy))
               .subscribe(data => console.log(data));
                this.result.emit({_type:'remove'});

       }
       else if(editType === 'editLanguage'){
        let language_id  = this.addLanguageForm.controls.language_id.value;
          let input = {
            language_id:language_id,
             rank:this.currentRate?this.currentRate:0
          }
          ;
          let id = this.data.id;

           this.userService
            .changeLanguage(id,input).pipe(takeUntil(this.$destroy))
             .subscribe(({data}) => {
                   this.result.emit({
                    language_id,
                    rank:this.currentRate,
                    _type:'edit'
                   })
             }) 
       }

  }
  ngOnDestroy(){
      this.$destroy.next();
      this.$destroy.complete();


  }
}
