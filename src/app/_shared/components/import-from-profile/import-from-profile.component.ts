import { Component, OnInit, OnDestroy, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { takeUntil, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import skillsExpertise from 'src/assets/data/en/slillsExp';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { rankTools } from 'src/app/v-office/open-v-office/utils/utils';
import { IImport } from '../../models/import-profile.interface';
 

@Component({
  selector: 'app-import-from-profile',
  templateUrl: './import-from-profile.component.html',
  styleUrls: ['./import-from-profile.component.scss']
})


export class ImportFromProfileComponent implements OnInit, OnDestroy {


  @Input() qualifications;

  @Input() isSubmited: boolean = true;

  @Input() isOpen = {
     open: true , 
     isEdit: false,
     id: ''
  };

  @Output() getDeletedId: EventEmitter<IImport> = new EventEmitter<IImport>();

  userId: string;
  $destroy: Subject<any> = new Subject<any>();
  toolsKeys: any = Object.keys(rankTools);
  toolsRank: any = rankTools;
  isCompany: boolean;
  
  toggleProfile =  {
      skill: false,
      tool: false,
      lang: false
  }
 

  constructor(
     private officeService: OfficeService,
     private globalUserProService: GlobalUserProService,
     private fb: FormBuilder
  ) {
     
   }

  ngOnInit() {
     this.userId = this.globalUserProService.getProfileId();    
     this.isCompany = this.globalUserProService.isCompanyActive();
     
  }
   
  //Initilize formgroup for FormArray
  createItem( skill: string ): FormGroup {
     
      return this.fb.group({
            skill
      })

  }
 
  createItemsTools( tool: string, rank: string ='' ): FormGroup {
    
      return this.fb.group({
          tool_Technology:[tool, Validators.required],
          rank: [rank, Validators.required]
      })
  }
  createItemsLang( lang: string, rank: string = '' ): FormGroup {
      
      return this.fb.group({
         language:[lang, Validators.required],
         rank: [rank, Validators.required]
         
      })
  }
  //Initilize FormArray

  addItem( name: string,  prop: string, rank?: string ) {    

          if( prop === 'skills' ) {
             const item = this.qualifications.get('skills') as FormArray;
             item.push(  this.createItem( name  ) );
           } else if( prop === 'toolTechnology' ) {
             const item = this.qualifications.get('toolTechnology') as FormArray;
             item.push(  this.createItemsTools( name, rank ) );
           } else if ( prop === 'languages' ) {
            const item = this.qualifications.get('languages') as FormArray;
            item.push(  this.createItemsLang( name, rank ) );
           }
          

  }

  // Get FormArray Controls 
  get qual() {
      return this.qualifications.controls as FormArray;
  }
  

 
// GET skills
  importSkills(): void { 

      this.officeService
        .importSkillsFromProfile( this.userId ) 
        .pipe( takeUntil(this.$destroy) )
         .subscribe(  ( { data  } ) => {
              data['getProfileByID']['skills'].map( skill => {             
                   this.addItem( skill.name ,  'skills')  
            })
         } )       
         this.toggleProfile.skill = true;   
  }

// GET tools
  importTools() {

      this.officeService
      .importTools( this.userId ) 
      .pipe( takeUntil(this.$destroy) )
        .subscribe(  ( { data  } ) => {

          data['getProfileByID']['toolsTechnologies'].map( tool => {             
                this.addItem( tool.tool_Technology ,  'toolTechnology', tool.rank)
                
            })
          
        } ) 
        this.toggleProfile.tool = true;   

        
  }

 // GET languages 

 importLanguages() {
     
     this.officeService
      .importLanguages( this.userId ) 
        .pipe( takeUntil(this.$destroy) )
          .subscribe(  ( { data  } ) => {

                data['getProfileByID']['languages'].map( lang => {             
                  this.addItem( lang.language , 'languages', lang.rate )

              }) 
          } ) 
          this.toggleProfile.lang = true;   
 
 }
  //Search
  
  searchSkill = (text:Observable<string>) => 
      text.pipe(
        debounceTime(200),
        distinctUntilChanged(),
          filter(val => val.length >= 2 ),
          map(skill =>  (skill === '' ? skillsExpertise
            : skillsExpertise.filter(val => val.toLowerCase().includes(skill.toLowerCase()) ))
                            .slice(0 , 5).sort((a,b) => a.length < b.length ? -1 : 1)
          )
 )

  //GET Items
  selectSkill(e:NgbTypeaheadSelectItemEvent) {
      this.addItem( e.item , 'skills');
      e.preventDefault();
  }

  // Add 
  selectTools(e: string) {
      if( e ) {
      return   this.addItem( e ,  'toolTechnology' );
     }
    return ;
  }

  selectLang(e: string ) {
      if(e) {
        return this.addItem( e ,  'languages' );
      }
    return ;
  }

  // Select rank
  selectToolRank(e: any, idx: number) {
    this.qualifications
      .get('toolTechnology')
       .at(idx)
         .get('rank')
          .setValue(e);
      
  }

  selectLangRank(e: any, idx: number) {
    this.qualifications
     .get('languages')
      .at(idx)
       .get('rank')
        .setValue(e);

    
  }

  skillFormatter = (result: any) => result;    

  //Remove Items 
  removeSkill(idx) {
    const skill = this.qualifications.get('skills').at(idx);
    if( skill.get('id') && skill.get('id').value ) {
      //Emit Skills
      this.getDeletedId.emit( {
          id: [ skill.get('id').value ],
          _type: 'skill'
      } );
  
    }
    this.qualifications.get('skills').removeAt(idx);
  }
  
  removeTool(idx) {   
    const tool = this.qualifications.get('toolTechnology').at(idx);
    if(tool.get('id') && tool.get('id').value ) { 
      //Emit tools
       this.getDeletedId.emit({
           id: [ tool.get('id').value ],
           _type: 'tool' 
       })

    }
    this.qualifications.get('toolTechnology').removeAt(idx);
  }

  removeLang(idx) {
    const langs = this.qualifications.get('languages').at(idx);
    if(langs.get('id') && langs.get('id').value ) {
       //Emit Languages
       this.getDeletedId.emit({
          id: [ langs.get('id').value ],
          _type: 'lang' 
       })  
    }
    this.qualifications.get('languages').removeAt(idx);
  }


  resetForms() {
    if(  this.qualifications.get('languages') &&  this.qualifications.get('languages').length > 0 ) {
      while(  this.qualifications.get('languages').length !== 0 ) {
        this.qualifications.get('languages').removeAt(0);
      }
    }

    if( this.qualifications.get('toolTechnology') &&  this.qualifications.get('toolTechnology').length > 0 ) {
      while(  this.qualifications.get('toolTechnology').length !== 0 ) {
        this.qualifications.get('toolTechnology').removeAt(0);
      }
    }

    if( this.qualifications.get('skills') &&  this.qualifications.get('skills').length > 0 ) {
      while(  this.qualifications.get('skills').length !== 0 ) {
        this.qualifications.get('skills').removeAt(0);
      }
    }

  
  }

  trackByFn =  (index) => index;
  
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    this.resetForms();
  }


}
