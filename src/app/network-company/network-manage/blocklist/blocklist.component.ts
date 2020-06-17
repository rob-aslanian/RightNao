import { Component, OnInit, OnDestroy } from '@angular/core';
import { NetworkCompanyService } from 'src/app/_shared/services/network/network-company.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blocklist',
  templateUrl: './blocklist.component.html',
  styleUrls: ['./blocklist.component.scss']
})
export class BlocklistComponent implements OnInit , OnDestroy{

  destroy$:Subject<any> = new Subject<any>()

  blockList: any[] = [];
  blockListLength:number;

  constructor(
     private networkService:NetworkCompanyService
    ) { }

  ngOnInit() {
    this.getBlockedProfiles();
  }

  getBlockedProfiles(){
    this.networkService
        .getBlockedUserOrCompany()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {

            this.blockList = data;
            
          },
          (err) => console.log(err)
          
        )
  }

  unBlock(item , index:number){
    let { id , is_company } = item,
        mutation = is_company ? this.networkService.unblocCompany(id) :
                                this.networkService.unblockUser(id);

     mutation
     .pipe(takeUntil(this.destroy$))
     .subscribe(
       (data) => {
          this.blockList.splice(index , 1);
       }
     );
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

  }


}
