import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { buesniessModel, IBuesniessModel } from './buesniess.model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-my-business-box',
  templateUrl: './my-business-box.component.html',
  styleUrls: ['./my-business-box.component.scss']
})
export class MyBusinessBoxComponent implements OnInit {

  buesniessModel = buesniessModel;

  @Input() type: IBuesniessModel;

  @Input() offices: any[];

  selectedModel: any = {};

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  companyId: string ;

  profile: string;
  profileId: string = '';
  
  constructor(
    private globalUserService: GlobalUserProService
  ) { }

  ngOnInit() {
    if( this.type ) {
         this.selectedModel = this.buesniessModel[this.type];
    }

    this.profileId = this.globalUserService.isCompanyActive() ?  this.globalUserService.getComapnyId() : this.globalUserService.getUserProfile()['id'] ;

    this.profile = this.globalUserService.isCompanyActive() ? 'company' : 'user';
 
  };

  deleteOffice( id: string ) {
         this.result.emit({
               id,
               _case: 'delete'
         }) 
  }
  
  deactivate( id: string, isDeactivated: boolean ) {
      this.result.emit({
            id,
            _case: 'deactivate',
            isDeactivated
      })
  }

}
