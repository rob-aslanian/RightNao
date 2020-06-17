import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageNames } from '../../../../assets/data/en/language';

import { IAccomplishment , IContact , IEducation , IExperience , ILanguage } from './models/index';
import { ProfileStatisticService } from '../../services/statistic/profile-statistic.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { utilities } from '../../utilities/utilities';


@Component({
  selector: 'app-save-to-pdf',
  templateUrl: './save-to-pdf.component.html',
  styleUrls: ['./save-to-pdf.component.scss']
})
export class SaveToPDFComponent implements OnInit {

  @Output() saved:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() data: any;
  @Input() save: any = false;

  private _contact: IContact;
  private _skills: Array<string> = [];
  private _languages: ILanguage[] = [];
  private _interests: Array<string> = [];
  private _experiences: IExperience[] = [];
  private _educations: IEducation[] = [];
  private _accomplishments: IAccomplishment[] = [];
  

  exportAsConfig:ExportAsConfig = {
    type:'pdf',
    elementId:"",
    options:{
      html2canvas:{
        allowTaint:false,
        height:1522,
        scale:2
      },
      jsPDF:{
        orientation:'portrait',
        format:'a3',
        unit:'mm',
        compress:true,
        precision:1,
        splitPage:false,
        FitWindow:true
      }
    }
    
  };

  constructor(
    private statisticService:ProfileStatisticService,
    private globalService:GlobalUserProService,
    private exportService:ExportAsService
  ) { }


  get isCompany() : boolean{
    return this.globalService.isCompanyActive()
  }

  get profileId() : string{
    return this.globalService.getProfileId()
  }

  get isOwnCV() : boolean {
    return this.profileId === this.data.id;
  }



  ngOnInit() {

    if(this.data){

      this.exportAsConfig.elementId = this.data.id;
  
      /// Work with contact ///
      this._contact = {
        email:this.data.email !== null ? this.data.email : null,
        phone:this.data.phone !== null ? this.data.phone : null,
        location: this.data.location.city !== "" && this.data.location.country !== "" ?
                  `${this.data.location.city},${this.data.location.country} ` : null

      };

      /// Work with skills //
      if(this.data.skills.length > 0){
         this._skills  =  this.data.skills.slice(0).slice(-10);
      }

      /// Work with languages ///
      if(this.data.languages.length > 0){
          this.data.languages.map(language => {
             let allLanguages = new LanguageNames().all_languages,
                 lang = null;

            /// Set Language name by abbr ///
             if(allLanguages[language.language]){
                lang = allLanguages[language.language];
             }
             return this._languages.push({
               name:lang,
               rate:language.rate
             });

          });
          
      }

      /// Work wih interests //
      if(this.data.interests.length > 0){
        this._interests = this.data.interests.slice(0).slice(-5);
      }

      /// Work with experience ///
      if(this.data.experiences.length > 0){
        let experiences = this.data.experiences.slice(0).slice(-2);

        experiences.map(experience => {
          let startDate = experience.start_date !== '' ? 
                          new Date(experience.start_date.split('-')[1] , experience.start_date.split('-')[0]) :
                          null,
              finishDate = experience.finish_date !== '' ? 
                           new Date(experience.finish_date.split('-')[1] , experience.finish_date.split('-')[0]) :
                           null,
              country = experience.location.country.id;

          return this._experiences.push({
            title:experience.title !== '' ? experience.title : null,
            company:experience.company !== '' ? experience.company : null,
            currently:experience.currently,
            startDate,
            finishDate,
            description:experience.description,
            location: experience.location.city.city !== "" && country !== "" ?
                      `${experience.location.city.city} , ${utilities.getCountryName(country)} ` : null
          })
        });
      }

      /// Work with educations /// 
      if(this.data.educations.length > 0){
        let educations = this.data.educations.slice(0).slice(-2);

        educations.map(education => {
          let startYear  = education.start_date !== '' ?
                           education.start_date.split('-')[1]  : null,
              finishYear = education.finish_date !== '' ?
                           education.finish_date.split('-')[1] : null;

          return this._educations.push({
            school:education.school,
            fieldStudy:education.field_study,
            startDate:startYear,
            finishDate:finishYear,
            currently_study:education.currently_study
          });

        });
      }

      /// Work with accomplishments ///
      if(this.data.accomplishments.length > 0){
        let accomplishments = this.data.accomplishments.slice(0).slice(-2);

        accomplishments.map(accomplishment => {
           let startDate = accomplishment.date && accomplishment.date !== '' ?
                          new Date(accomplishment.date.split('-')[1] , accomplishment.date.split('-')[0]) :
                          null,
             finishDate = accomplishment.finish && accomplishment.finish !== '' ?
                          new Date(accomplishment.finish.split('-')[1] , accomplishment.finish.split('-')[0]) :
                          null;

            return this._accomplishments.push({
              type:accomplishment.__typename,
              title:accomplishment.title ? accomplishment.title : accomplishment.name,
              startDate,
              finishDate
            })
        });

        
      }
      
    }
    
  }

  saveCV(){
    if(this.data){

      let fileName = `${this.data.firstname || this.data.first_name}_${this.data.lastname || this.data.last_name}`;
      window.scrollTo({top:0 , behavior:'auto'});
      
      this.exportService
          .save(this.exportAsConfig , fileName)
          .subscribe(
            () => { this.cvGenerateStatistic() }
          )
    }

  }
  

  cvGenerateStatistic(){
    if(this.data.id){
      let id = this.isCompany ? {companyId:this.profileId} : { userId:this.profileId};
      this.statisticService
          .sentUserStatistic({
            ...id,
            id:this.data.id,
            isCompany:this.isCompany,
            isOwnCV:this.isOwnCV,
            os:navigator.platform,
            timestamp:new Date().toISOString()
          } , 'CV')
          .subscribe()
    }
  }

  trackByFn =  (index) => index;

  ngOnDestroy(): void {
    this.data = undefined;
    this.save = false;
  }

}
