import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ICategories } from '../models/categories.interface';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { FormControl } from '@angular/forms';
 

@Component({
  selector: 'app-network-categories',
  templateUrl: './network-categories.component.html', 
  styleUrls: ['./network-categories.component.scss']
})
export class NetworkCategoriesComponent implements OnInit, OnChanges {

  categoriesList: ICategories = {
        favorite: [],
        friends_and_family: [],
        business: [],
        work: [],
        other: [],
  };

  @Input() allCategoriesList: any;
  
  seleCtedCat: ( string | null ) = 'all';

  @Output() result: EventEmitter<any> = new EventEmitter<any>();
   
  subControl: FormControl;


  constructor(
    private networkService: NetworkUserService
  ) { 
    this.subControl = new FormControl();
  }

  ngOnInit() {
 
  }

  ngOnChanges() {

    if( this.allCategoriesList ) {
      this.allCategoriesList.map( item =>  {
          //  let keys: string = Object.keys(item)[0];
          //  this.categoriesList[keys] = item[keys];
          item.children.map( ( child ) => {
               this.categoriesList[item.unique_name].push( child.name );
          } )
            
      })
    }
   
    
  }

  getSubCategory( type: string, subCategory: string, selected: ( string | null ) ) {
      this.result.emit({
         type: 'open',
         data : {
             name : type !== '' && type !== 'favourites' ? `${type}__${subCategory}` : type
         }
      }) 
      this.seleCtedCat = selected || 'gia';
  }

  addSubCategory(  type: string ) {
    const value = this.subControl.value;

    if( !value ) return ;

      this.networkService
        .createCategories( value.trim(), type )
         .subscribe( () =>  {
                this.categoriesList[type].push( value.trim() );
                this.allCategoriesList.map( (sub, i) => {
                   if( sub.unique_name === type ) {
                      this.allCategoriesList[i].children.push( value.trim );
                   }
                } )
                this.subControl.reset();
         } );
 
  }

  deleteCategorie( item: string, type: string, idx: number ) {
     this.networkService
      .RemoveCategory(
         item,
         type
      ).subscribe( () => this.categoriesList[type].splice(idx, 1) );
     
  }
}
