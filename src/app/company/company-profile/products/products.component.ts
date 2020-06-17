import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IProduct, IProducts } from 'src/app/_shared/models/company/product.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data;

  products:IProduct[];
  isAdmin:boolean = false;

  startPage:number = 2;
  modalType:string = null;
  editableData:IProduct;

  @Input()
          set data(value:IProducts){
            this._data = value;
            this.products = value['products']; 
            this.isAdmin = value['isAdmin'];
          }

          get data() : IProducts{
            return this._data;
          }

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  getProduct(product:IProduct){
    let { _close , _type , id } = product,
    indexOfProduct = this.products.findIndex(ml => ml.id === id);


    console.log(product);

    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        this.products.unshift(product);
        break;
      }
      /// Edit
      case'edit':{
        this.products[indexOfProduct] = product;
        break;
      }
      /// Delete
      case'delete':{
        this.products.splice(indexOfProduct , 1);
        break;
      }

      default:break;

    }
  }

  open(isEdit?:boolean , content?:IProduct){

    this.modal.open();
    
    /// Edit
    if(isEdit){
      this.modal.$title =  this.translate.get('1105') ;
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title = this.translate.get('84');
      this.modalType = 'add';
    }
  }
  openEmptyModal() {
    this.open( false );
  }
}
