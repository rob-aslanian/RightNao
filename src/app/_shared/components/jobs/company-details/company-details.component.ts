import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJob , IJobMatcher } from 'src/app/_shared/models/jobs/jobs.interface';
import { JobBenefits } from 'src/app/jobs/models/postJobmodels';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  private _selectedLang:string;
  private _data:IJob['details'];

  @Output() scrollTop:EventEmitter<number> = new EventEmitter<number>();
  
  @Input() 
      set data(value:IJob['details']) {
        if(value){
          this._data = value;
          let { descriptions , benefits , required , preterred } = value;

          this.descriptionLangs = descriptions.map(desc => desc.language.toLocaleUpperCase());
          this.selectedDescription = descriptions[0].description;
          this.selectedWhyUs = descriptions[0].why_us;

          /// Set matcher
          this.matcher.required = required;
          this.matcher.preterred = preterred;
    

          /// Parse benefits ///
          if(benefits && benefits.length > 0){
            this.benefits = benefits.map(ben => JobBenefits.filter(b => b.id === ben)[0]);
          } 

          
        }
      }

      get data():IJob['details'] {
         return this._data
      }
  @Input() 
          set selectedLang(lang:string){

            if(lang){
              
              let descriptions = this.data.descriptions,
                  abbr = lang.toLowerCase(),
                  indexOfDescription = descriptions.findIndex(desc => desc.language === abbr);

        
                if(indexOfDescription > -1){
                  this.selectedDescription = descriptions[indexOfDescription].description;
                  this.selectedWhyUs = descriptions[indexOfDescription].why_us;
                }
            }

            this._selectedLang = lang;
          };

          get selectedLang() : string{
            return this._selectedLang;
          }

  benefits: any[];
  descriptionLangs: string[];
  selectedDescription: string;
  selectedWhyUs: string;
  matcher:IJobMatcher = {};

  constructor() { }

  ngOnInit() {
  }

  onScroll = (e) => this.scrollTop.next(e.target.scrollTop);
  trackByFn =  (index) => index;

}
