import { Injectable } from '@angular/core';
import { IFile } from 'src/app/_shared/models/files.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private _companyId:string;
  private _files:IFile[];

  constructor() { }

  set comapyId(value:string){
    this._companyId = value;
  }

  get comapyId() : string {
    return this._companyId;
  }

  set files(value:IFile[]){
    this._files = value;
  }

  get files() : IFile[]{
    return this._files;
  }

}
