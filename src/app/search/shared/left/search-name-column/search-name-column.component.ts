import { Component, OnInit } from '@angular/core';
import { SearchByType, SearchUserInput } from 'src/app/search/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-name-column',
  templateUrl: './search-name-column.component.html',
  styleUrls: ['./search-name-column.component.scss']
})
export class SearchNameColumnComponent implements OnInit {

  type:SearchByType;
  form:FormGroup;

  users:Observable<any>;
  
  constructor(
    private searchService:SearchService,
    private f:FormBuilder
  ) { 
    this.type = searchService.type;

    this.form = this.f.group({});

  }

  ngOnInit() {
  }

  searchUser(e){
    const item = e.target.value.trim();

    if(item !== "" && item.length > 0 ){
      this.users = this.searchService
                           .searchUsers({
                             ...new SearchUserInput(),
                             full_name:item
                           } , {
                             first:10,
                             after:"0"
                           })
                           .pipe(map(data => data['profiles']))  
    }
 }
 

 selectUser(user){

   this.form
       .get('founders_name')
       .setValue(`${user.firstname} ${user.lastname}`);

   this.form
       .get('founders_id')
       .setValue(user.id)
 }


}
