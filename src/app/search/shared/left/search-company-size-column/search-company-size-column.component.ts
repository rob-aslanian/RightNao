import { Component, OnInit } from '@angular/core';
import { companyEmployee } from 'src/app/_shared/models/company';
import { FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-company-size-column',
  templateUrl: './search-company-size-column.component.html',
  styleUrls: ['./search-company-size-column.component.scss']
})
export class SearchCompanySizeColumnComponent implements OnInit {

  companySize = companyEmployee;
  companyKeys: Array<string> = Object.keys(companyEmployee);

  form:FormGroup;
  sizes = [];
  formName:string = 'size';
  
  constructor(
    private searchService:SearchService
  ) {
    this.form = new FormGroup({});
    this.formName = searchService.type === 'job' ? 'company_size' : 'size';
   }

  ngOnInit() {

  }


  // checksBoxChange(e){
  //   const target = e.target;
    

  //  this.sizes
  //      .map(el => {
  //         if(el.name === target.value) {
  //             el.isSelected = target.checked;
  //         }else{
  //           this.sizes.push({
  //             name:target.value,
  //             isSelected:target.checked,
  //           })
  //         }
  //      })
    

  //   this.setData();
  // }



  // setData(){
  //   this.form.get('size').patchValue(
  //     this.sizes
  //         .filter(el => el.isSelected)
  //         .map(el => el['name'])
  //    )
  // }


}
