import { Component, OnInit, ViewChild } from '@angular/core';
import { EstateFormService } from '../Service/estate-form.service';
import { RealEstateService } from '../Service/real-estate.service';
import { ActivatedRoute } from '@angular/router';
import { select_materials } from '../../Shared/models/estate-model';
import  * as model from '../../Shared/models/estate-model';


@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.scss']
})
export class EditEstateComponent implements OnInit {

  materials = select_materials;
  model = model;

  
  constructor(
    private formService: EstateFormService,
    private estateService:     RealEstateService,
    private activatedRoute:    ActivatedRoute
  ) { };  

  ngOnInit() {
    const { id } = this.activatedRoute.snapshot.params;

    this.estateService
        .getRealEstateById( id )
        .subscribe( data => this.parseEstate( data ) )
  }

  parseEstate( data: any ) {
      const { property_type, deal_type, location, } = data['rental_info'];
     
      this.formService.dealType.patchValue({
          deal_type,
          property_type,
          location: {
              country_id: deal_type === 'DealType_Renovation' ? data['country_ids'][0]  : location.country,
              city: {
                city: deal_type === 'DealType_Renovation' ? data['city_ids'][0]  :  location.city
              },
              street: location.street,
              address: location.address
          }
      })


      const selectedProperty = this.model[data['rental_info']['property_type']];
   
      this.handleCheckbox(selectedProperty, data);

      this.formService
          .savedFiles.next( data.files );
      this.submitForm( deal_type, data )
  };

  handleCheckbox( checkboxes: any, data ) {
    Object.keys(checkboxes).map( key => {           
            data[key].map( id => {
              checkboxes[key].forEach( element => {
                        if( element.id === id ) {
                             element.checked = true;
                        }
                 });
            } )
    } )
  }
   

  submitForm( fieldType: string, data: any  ) {
    
    const rental_detail = {
          description: data['rental_details'].length > 0 ? data['rental_details'][0]['title'] : '',
          title:  data['rental_details'].length > 0 ? data['rental_details'][0]['description'] : '',
    };

    this.formService
        .deal_type_renovation.patchValue( rental_detail );


    switch (fieldType) {
          case 'DealType_Build':            
              this.formService.totalArea.patchValue({
                   total_area: data['total_area'] ,
                   metrict_type:  data['metrict_type']     
              });
              this.formService.buildForm.get('timing').setValue(data['timing']);  
          return;
          case 'DealType_Materials':
              this.materials.forEach(( material ) => {
                data.materials.map( mat => {
                      if( mat === material.id ) {
                           material.checked = true;
                      };
                } )   
               });
              return
          case 'DealType_Renovation':
                  this.formService.interior.patchValue(data['interior']);
                  this.formService.interior_exterior.patchValue(data['interior_and_exterior']);
                  this.formService.exterior.patchValue(data['exterior']);
              return             
          case 'DealType_Move':
              return   
        };
  }


}
