import { Component, OnInit, Input } from '@angular/core';
import {utilities} from '../../../_shared/utilities/utilities';
import { NetworkUserService } from '../../services/network/network-user.service';
@Component({
  selector: 'app-small-info-box',
  templateUrl: './small-info-box.component.html',
  styleUrls: ['./small-info-box.component.scss']
})
export class SmallInfoBoxComponent implements OnInit {

  @Input() data;
  fullName:string = null;
  friendsId:string;
  dateData:object;
  
  constructor(
    private networkService: NetworkUserService
  ) { }

  ngOnInit() {
    if(this.data){
    
      
      this.parseData();
     this.friendsId =  this.data.friendship_id;
    }
  }
  parseData(){
     let {firstname , lastname } = this.data;
     this.fullName = `${firstname || ''} ${lastname || ''}`;

     this.networkService
     .getFriendshipsForBox()
       .subscribe(({data}) => {       
       let parseData =   data['getFriendships'].filter(val => val.id === this.friendsId ? val:null);       
       this.dateData =  utilities.getDate(parseData[0]);
    })
  }

}
