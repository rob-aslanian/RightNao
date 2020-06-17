import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NetworkService } from 'src/app/_shared/services/filters/network-service.service';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';

@Component({
  selector: 'app-network-add-categories',
  templateUrl: './network-add-categories.component.html',
  styleUrls: ['./network-add-categories.component.scss']
})
export class NetworkAddCategoriesComponent implements OnInit, OnChanges {

  /**
   * Get All Categories
   * 
   */
  @Input() allCategoriesList: any;


  /**
   * Get user id or Company id
   * 
   */
  @Input( ) id: string 

  /**
   * get categories wich arr added 
   * 
   */
  @Input() addedInCategories: any;



  categoriesList: any = {
      favorite: [],
      friends_and_family: [],
      business: [],
      work: [],
      other: [] ,
  };

  subCategoriesMenu: string = '';
  subControl: FormControl;
  subCat: any = [];

  constructor(
     private networkService: NetworkUserService
  ) { 
    this.subControl = new FormControl();
  }

  

  ngOnInit() {
  
  }
  ngOnChanges() {
   
    if( this.allCategoriesList && this.addedInCategories ) {
      this.parseData( this.allCategoriesList, this.addedInCategories )
     
      //   this.allCategoriesList.map( item =>  {
      //       let keys: string = Object.keys(item)[0];
      //       this.categoriesList[keys] = item[keys];
      //   })    
      // this.parseData();
    }

  }
  
  subCategories( type: string ) {
     if( type === this.subCategoriesMenu ) return this.subCategoriesMenu = '';
     this.subCategoriesMenu = type;
  }

  addSubCategory(  ) {     
     const value: string = this.subControl.value.trim();

     if( !value ) return;

     this.networkService
        .createCategories(
          value.trim(),
          this.subCategoriesMenu
        ).subscribe( () => {
               this.categoriesList[this.subCategoriesMenu].push( value.trim() );
               this.subControl.reset();
        } ) 
  }

  addInSubCategory( subCatName: string ) {
      console.log( subCatName, this.id,  );
      
  }
  parseData( allCategories: any[], addedInCategories: any[] ) {
    let img = 100;
    
    this.subCat =   allCategories.map(
                  item => {
                      return {
                          name: item.name,
                          unique_name: item.unique_name,
                          img: `${img++}.svg`,
                          children: item.children.map( child => {
                                return {
                                  name: child.name,
                                  isSelected: addedInCategories.filter( subs => subs === child.unique_name).length > 0 ? true : false,
                                  unique_name: child.unique_name
                                }
                          } )
                      }
                      
                  }
              );
  console.log(this.subCat);
  

  }

  addRemoveInSubCategory( subCategory: string, isAdd: boolean, parentIndex: number, idx: number ) {
        
      isAdd ? 

        this.networkService
       .addToCategories(
         this.id,
         subCategory
       ).subscribe( () => this.subCat[parentIndex].children[idx]['isSelected'] = true )

        : this.networkService
        .removeFromCategories(
            this.id,
            subCategory
        ).subscribe( () => this.subCat[parentIndex].children[idx]['isSelected'] = false );
          
     
  }
}
