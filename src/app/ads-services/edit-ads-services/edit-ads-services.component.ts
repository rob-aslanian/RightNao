import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsServicesService } from '../ads-services.service';
import { FormGroup } from '@angular/forms';
import { AddAdsService } from '../add-ads-services/add-ads.service';
import { EstateFormService } from 'src/app/real-estate/add-estate/Service/estate-form.service';

@Component({
  selector: 'app-edit-ads-services',
  templateUrl: './edit-ads-services.component.html',
  styleUrls: ['./edit-ads-services.component.scss']
})
export class EditAdsServicesComponent implements OnInit {
  servicesForm:FormGroup;
  isLoading:boolean = true;

  constructor(
    private route:ActivatedRoute,
    private adsService:AdsServicesService,
    private addService:AddAdsService,
    private sharedService:EstateFormService
  ) { 
    this.servicesForm = this.addService.addForm;
  }

  ngOnInit() {
    this.route.params.subscribe( ({id}) => this.getServiceForEdit(id) ) 
  }
  getServiceForEdit(id){
          this.adsService.GetAdServiceForEdit(id)
                      .subscribe(data => {
                        this.servicesForm.patchValue(data);
                        this.addService.phones = data['phones'];
                        // console.log('inedit',this.servicesForm.get('phones').value);
                        console.log(data);
                        this.isLoading = false;
                        this.sharedService.savedFiles.next(data['files']);
                      })
  }

}
