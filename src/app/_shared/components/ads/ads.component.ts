import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, Type, ComponentRef, Input } from '@angular/core';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AdsService } from '../../services/ads/ads.service';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AdsProviderService } from './ads-provider.service';
import { AdvertFormatType } from '../../models/ads/ads.type';
import { IAdsCommon } from './ads-provice.model';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  providers:[ 
    {
      provide: AdsProviderService,
      useClass:AdsProviderService,
    }
   ]
})
export class AdsComponent implements OnInit {

  @Input() isLeft:boolean = false;

  @ViewChild('adsContainer' , { static:true, read:ViewContainerRef }) adsContainer:ViewContainerRef;

  components:ComponentRef<IAdsCommon>[] = [];

  constructor(
    private globalService:GlobalUserProService,
    private adsService:AdsService,
    private router:ActivatedRoute,
    private  provideService:AdsProviderService,
    private componentResolver:ComponentFactoryResolver,
  ) { }


  ngOnInit() {
    this.getAdvert();
  }

  getAdvert(){
    const routerConfig = this.router.snapshot.routeConfig;
    const { formats , amounts } = this.provideService
                                      .getAdsType(routerConfig.component.name , this.isLeft , routerConfig.data)

    this.injectComponent(<AdvertFormatType[]>formats) 

    timer(0 , 300000).pipe(
            switchMap(() => 
                this.adsService
                    .GetAdverts(formats , amounts)
            ))
            .subscribe(({adverts}) => {
              if (adverts.length > 0) {
                this.components.map(el => {
                  const formates = el.instance.formates;
                  if (formates) {
                    el.instance.data = adverts.filter(advert => advert.formats.some(a => formates.includes(a)));
                    if (el.instance.click) {
                      el.instance.click = this.advertClick.bind(this)
                    }
                  }
                })             
              }
            })

  }


  injectComponent(formats:AdvertFormatType[]) {
    try {
      formats.map(format => {
        const componentByFormat = this.provideService.getComponentByFormat(format);
        const component = this.componentResolver.resolveComponentFactory(componentByFormat as Type<IAdsCommon>)

        this.components.push(this.adsContainer.createComponent(component));
      })
    } 
    catch(e) {
        throw new Error(e);
    }
  }

  advertClick(e:Event , id:string , clicks:number) : void {
    e.stopPropagation();

    if (clicks > 0) {
       this.adsService
           .ClickOnAdvert(id)
           .subscribe()
 
    }

     return;
  }


  get isCompany(){
    return this.globalService.isAuthenticated() && 
           this.globalService.isCompanyActive();
  }

  trackByFn =  (index) => index;

}
