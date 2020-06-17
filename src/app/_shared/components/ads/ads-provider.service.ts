import { Injectable } from '@angular/core';
import { AdvertFormatType } from '../../models/ads/ads.type';
import { COMPONENTS, IAdsProvider, ADS_COMPONENTS_PATH } from './ads-provice.model';



@Injectable()
export class AdsProviderService {

  constructor() { }


  private _toArray(arr:[] | any) {
     return Array.isArray(arr) ? arr : [arr]
  }

  private _getFormates(cmName:string ,isLeft:boolean , cmData?:string ) : IAdsProvider {
     const components = COMPONENTS[cmName];
     
     if (components && !isLeft) {
        const formats = components.formats;

        if (cmData != undefined) {          
          return {
            formats:<AdvertFormatType[]>(this._toArray(components[cmData].formats)),
            amounts: components[cmData].amounts || 20,
          }
        }
 
        return {
          formats:<AdvertFormatType[]>(this._toArray(formats)),
          amounts: <number>components.amounts || 20,
        }
      }

      return {
        formats:<AdvertFormatType[]>(this._toArray(COMPONENTS["Common"].formats)),
        amounts: <number>COMPONENTS["Common"].amounts || 20,
      }
  
  
  }

  getAdsType(cmName:string , isLeft:boolean ,  cmData?:Object) : IAdsProvider {
    if (cmData != undefined) {
        const value = Object.values(cmData)[0];
        return this._getFormates(cmName ,isLeft ,  value);
        
    }
    return this._getFormates(cmName , isLeft);
    
  }


  getComponentByFormat(format:AdvertFormatType) {
    return ADS_COMPONENTS_PATH[format];
  }
}
