import { OnInit, Component, OnDestroy } from "@angular/core";
import { RealEstateService } from "./Service/real-estate.service";
import { EstateFormService } from "./Service/estate-form.service";

@Component({
  selector: 'app-add-estate',
  templateUrl: './add-estate.component.html',
  styleUrls: ['./add-estate.component.scss']
})
export class AddEstateComponent implements OnInit {
  
  stepAmount: number = 3;
  currentStep: number = 0;
   
  constructor(
    private estateService: RealEstateService,
    private estateFormService: EstateFormService
  ) { }

  ngOnInit() { 
    this.estateService.step
    .subscribe(( type: string ) => {
        if( type === 'next' ) this.currentStep++;
        else  this.currentStep--;
      })
   }

   s
}
