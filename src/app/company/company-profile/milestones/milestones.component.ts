import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { IMilestones, IMilestone } from 'src/app/_shared/models/company/milestone.interface';
import { Subject } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit , OnDestroy {

  private _data:IMilestones;
  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @Input() 
          set data(value:IMilestones){
              if(value){
                  this._data = value;
              }
          }
          get data() : IMilestones{
            return this._data;
          }
  
  startPage:number = 2;
  modalType:string = null;
  editableData:IMilestone;

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {

  }

  getMileStone(milestone:IMilestone){
    let { _close , _type , id } = milestone,
        indexOfMilestone = this.data.milestones.findIndex(ml => ml.id === id);


    console.log(milestone);
    
    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        this.data.milestones.unshift(milestone);
        break;
      }
      /// Edit
      case'edit':{
        this.data.milestones[indexOfMilestone] = milestone;
        break;
      }
      /// Delete
      case'delete':{
        this.data.milestones.splice(indexOfMilestone , 1);
        break;
      }

      default:break;

    }


  }

  get getMileStoneYears() : any[] {
    let years = new Set();
    this.data.milestones.map(ml => years.add(ml.year));

    return Array.from(years);
  }

  milestonesByYears(year:number) : IMilestone[]{
    return this.data.milestones.filter(ml => ml.year === year);
  }

  open(isEdit?:boolean , content?:IMilestone){

    this.modal.open();
    
    /// Edit
    if(isEdit){
      this.modal.$title = this.translate.get('915');
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title = this.translate.get('81');
      this.modalType = 'add';
    }
  }

  openEmptyModal() {
    this.open( false );
  }

  ngOnDestroy(){
    this.modal.close();
  }
  
}
