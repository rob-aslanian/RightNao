import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { subIndustry } from '../../models/companyAbout.model';
import { ISubindustries, IIndustry } from '../../models/company/industries.interface';
import industries from 'src/assets/data/en/industries';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {


  @Input() data;
  @Input() id:string;
  @Input() enableCheckAll:boolean = true

  @Output() result:EventEmitter<any> = new EventEmitter<any>();

  dropdownSettingsSubIndustry:any;
  dropdownListSubIndustrySelected = [];  
  dropdownListSubIndustry: ISubindustries[] = [];

  industries:IIndustry;

  constructor() { 

  }

  ngOnInit() {
 
    this.dropdownSettingsSubIndustry = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll:this.enableCheckAll
    };
    /// Get subindustries ///
    if(this.id){
      this.getInudstry();
    }
    
    if(this.data){
      
      this.patchData();
    }
  }

  getInudstry(){
    this.industries = industries.find(ind => ind.id === this.id);

    if(this.industries){
      this.dropdownListSubIndustry = this.industries.subindustries;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
     if(changes.id){
       this.getInudstry();
     }
  }

  onChange(items){

    this.result.emit(items.map(item => item.id));
  }

  patchData(){
     /// Set sub industry ///
     if(this.data.length > 0) {
      let subindustries = this.data; 

      this.dropdownListSubIndustrySelected = subindustries.map(sub => this.industries
                                                                          .subindustries
                                                                          .find(ind => ind.id === sub));
    
     this.result.emit(this.data);
    } else{ this.dropdownListSubIndustrySelected = [] }
  }

}
