import { Injectable } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AdsBannerService {

  private _bannerFirstForm;
  private _modal:AppModalComponent;
  private _amount:number;

  constructor() { }

  set bannerFirstForm(value){
    this._bannerFirstForm = value;
  }

  get bannerFirstForm(){
    return this._bannerFirstForm
  }

  set modal(value:AppModalComponent) {
    this._modal = value;
  } 

  get modal() : AppModalComponent {
    return this._modal;
  }

  set amount(value:number){
    this._amount = value;
  }

  get amount() : number {
    return this._amount;
  }
}
