import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RegionService } from 'src/app/_shared/region.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { languageEnum } from 'src/app/v-office/open-v-office/utils/utils';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-office-language-modal',
  templateUrl: './office-language-modal.component.html',
  styleUrls: ['./office-language-modal.component.scss']
})
export class OfficeLanguageModalComponent implements OnInit {
 
  listOfLanguages: any[] = [];
  userId: string = '';
  languageEnum = languageEnum;
  isImported: boolean = false;

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  @Input() editLanguages: any[] = [];

  deletedLangIds: string[] = [];

  language: FormGroup;
  
  constructor(
    private region: RegionService,
    private officeService: OfficeService,
    public globalUserProService: GlobalUserProService,
    private fb: FormBuilder
  ) { 
       this.language = fb.group({
           languages: fb.array([])
       });
  }

  ngOnInit() {

    this.listOfLanguages =  this.region.getListOfLanguages();
    this.userId = this.globalUserProService.getUserProfile()['id'];

    if( this.editLanguages.length > 0 ) {
           const languages = this.language.get('languages') as FormArray;
           this.editLanguages.map( lang => {
                 languages.push( this.languagesFormGroup(lang.language, lang.rank, lang.id) );
           } )
    }
    
  }

  
  searchLanguage= (text$: Observable<string>) =>    
  text$.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    map( input => input.length > 1 ? 
                  this.listOfLanguages.filter( lang => lang.item_text.toLowerCase().startsWith(input.toLowerCase()) ) : []  )
  )

  languageFormatter = (result: any) => result.item_text;   

  getLanguage(  item: NgbTypeaheadSelectItemEvent , input ) {
      item.preventDefault();
      const languages = this.language.get('languages') as FormArray;
      languages.push(this.languagesFormGroup( item.item.item_text, 'Level_Begginer' ));
      input.value = '';
  };  

  importLanguages() {
    this.isImported = true;

    const languages = this.language.get('languages') as FormArray;

    this.officeService
    .importLanguages( this.userId ).pipe(
       map( ({ data }) => data['getProfileByID']['languages'] )
    ).subscribe( (profileLanguages: any[] ) => {
     profileLanguages.map( lang => {            
               languages.push(
                    this.languagesFormGroup(  
                              this.listOfLanguages.filter( langs => langs.item_id === lang.language )[0]['item_text'],
                              this.languageEnum[lang.rate.toString()] 
                ))
        })
     })
 }

  removeLanguage( i: number , lang: FormGroup) {
       const language = this.language.get('languages') as FormArray;
       const { id } = lang.value;
       if( id ) this.deletedLangIds.push( id );
       language.removeAt( i );
  };

  addLanguages() {
     const language = this.language.get('languages') as FormArray;
     if( this.editLanguages.length > 0 ) return this.result.emit({
          addedLanguages: language.value,
          deletedLanguages: this.deletedLangIds,
          _case: 'edit'
     })
     this.result.emit({
           addedLanguages:language.value,
          _case: 'add'
     })
  };

  languagesFormGroup( lang: string, rank: string , id: string = '') {
      return this.fb.group({
           language: [lang],
           rank: [ rank , Validators.required],
           id: [ id ]
      })
  }
 
}
