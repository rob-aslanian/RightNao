import { Injectable } from '@angular/core';
import { IAdsCandidate } from 'src/app/_shared/models/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsCandidateService {

  private _adsCandidate:IAdsCandidate;
  private _profile;

  constructor() { }

  set adsCandidate(value:IAdsCandidate) {
    this._adsCandidate = value;
  }

  get adsCandidate() : IAdsCandidate{
    return this._adsCandidate;
  }

  set profile(value){
    this._profile = value;
  }

  get profile(){
    return this._profile;
  } 
}
