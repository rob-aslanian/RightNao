import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UtilsService } from '../../services/shared/utils.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { NotificationAlertComponent } from '../notification-alert/notification-alert.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comming-soon',
  templateUrl: './comming-soon.component.html',
  styleUrls: ['./comming-soon.component.scss']
})
export class CommingSoonComponent implements OnInit , OnDestroy {


  destroy$:Subject<any> = new Subject<any>();

  @ViewChild('notifyBox' , { static:true ,  read:ViewContainerRef }) container:ViewContainerRef;

  title:Observable<any>;
  email:string;
  hasNotifyBox:boolean = false;
  currentProfile:any;

  constructor(
    private router:ActivatedRoute,
    private utilService:UtilsService,
    private globalService:GlobalUserProService,
    private resolver:ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.title = this.router.params
    this.email = this.globalService.getEmail();

    this.currentProfile = this.globalService.getProfileNameAndAvatar();
    
  }
  
  submit(e , type:string){
    e.preventDefault();

    this.utilService
        .VoteForComingSoon(this.email , type)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() =>  this.insertComponent())

  }

  insertComponent(){
    const comp = this.resolver.resolveComponentFactory(NotificationAlertComponent),
          el = this.container.createComponent(comp);

    if (el && el.instance.show) {
      const instance = el.instance;

      instance.type = 'comingSoon';
      instance.show = true;
      instance.data = this.currentProfile;
      this.hasNotifyBox = true;

      
      instance.close
              .pipe(takeUntil(this.destroy$))
              .subscribe(() => {
                this.container.remove();
                this.hasNotifyBox = false;
              })
    
    }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

  }

}
