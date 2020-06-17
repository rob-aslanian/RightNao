import { Component, Input, OnChanges } from '@angular/core';
import { UtilsService } from '../../services/shared/utils.service';
import { utilities } from '../../utilities/utilities';


//// /#(\p{N}|\p{L}|_)+|#(\p{L})+/gium
const alphanumericRegex =  /#([^\x00-\x7F]|\w)+/gium
@Component({
  selector: 'app-read-more',
  template:`
    <ng-container *ngIf="text">
      <div [innerHTML]="currentText" style="display:inline;"></div>
      <span *ngIf="currentText.length > maxLength" class="backgroundless"
        (click)="togglText()">
      {{ isCollapsed ?  "Less" : "More" }}
      </span>
  </ng-container>`,

})
export class ReadMoreComponent implements OnChanges {

  @Input() text:string;
  @Input() split;
  @Input() maxLength:number = 100;
  @Input() tags:any[] = [];

  currentText:string;
  isCollapsed:boolean = false;
  hasParsedTag:boolean = false;
  hasParsedSplit:boolean = false;

  

  constructor(
    private utilService:UtilsService
  ) { }

  ngOnChanges(): void {
    this.determView()
    
  }

  togglText(){
    this.isCollapsed = !this.isCollapsed;
    this.determView();
  }


  parseTags(){
    this.tags.map(tag => {
      let { id , type  } = tag;
      this.utilService
          .getShortProfile(id , type)
          .subscribe(
            (data) => {
              let isComapny = data.__typename === "CompanyProfile",
                  name = isComapny ?  data.name : `${data.firstname} ${data.lastname}`,
                  link = isComapny ? `/company/profile/${data.url}` : `/user/profile/${data.url}`;
              
              this.text = this.text.replace(new RegExp(`@${id}` , 'gim'), 
               `<strong><a href="${utilities.getLocationLink}${link}" target="_blank">${name}</a></strong>`
              ).trim();
              this.currentText = this.text;
            }
          )

        this.hasParsedTag = true;
    })
  }

  determView(){
 

    if(this.tags){
      if(this.tags.length > 0 && !this.hasParsedTag) { 
        this.parseTags()
      }
    }

    if(this.split && !this.hasParsedSplit){
       let words = new Set(this.text.match(alphanumericRegex));
 
      if(words && words.size > 0) {
        words.forEach(word => {

          this.text = this.text.replace(new RegExp(word , 'g') , `<a  href="${word}">${word}</a>`).trim();
        });
        this.hasParsedSplit = true;
        this.currentText = this.text;
        
      }   
    }

    if(!this.text || this.text.length <= this.maxLength){
      this.currentText = this.text;
    }else{
  
      !this.isCollapsed && this.text.length > this.maxLength  ?
                           this.currentText =  this.text.substring(0 , this.maxLength) + '...':
                           this.currentText = this.text;
    }
  }

}
