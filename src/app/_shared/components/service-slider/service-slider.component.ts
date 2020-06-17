import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { EstateFormService } from 'src/app/real-estate/add-estate/Service/estate-form.service';
 
   
@Component({
  selector: 'app-service-slider',
  templateUrl: './service-slider.component.html',
  styleUrls: ['./service-slider.component.scss']
})

export class ServiceSliderComponent implements OnInit {

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  @Input() filesForEdit: any[] = [];

  @Input() isEdit: boolean = false;

  errors: boolean = false;

  submitted: boolean = false;

  constructor(
    private sanitize: DomSanitizer,
    private sharedService: EstateFormService
  ) { }

  slider: any[] = [
    {img: null, id: '', file: {}},
    {img: null, id: '', file: {}},
    {img: null, id: '', file: {}},
  ];

  counter: number = 0 ;

  sliderImages: any[] = [
    [
      {img: null, id: '', file: {}},
      {img: null, id: '', file: {}},
      {img: null, id: '', file: {}}
    ]
  ];
  

  ngOnInit() {   
    if( this.filesForEdit.length > 0 ) {    
          this.sliderImages = this.filesForEdit;
          this.slider = this.filesForEdit[0];         
      };     
  };


 
  next() {
    
  this.counter =   this.counter + 1;
    if( this.counter   ===  this.sliderImages.length ) {
      this.sliderImages.push([ 
                               {img: null, id: '', file: {}},
                               {img: null, id: '', file: {}},
                               {img: null, id: '', file: {}}
                            ]);
      this.slider = [
          {img: null, id: '', file: {}},
          {img: null, id: '', file: {}},
          {img: null, id: '', file: {}}
      ]
    }
 //Case if slider is already addded and we dont add new 
  else {  this.slider =  this.sliderImages[this.counter]; }

  }

 
  back() {
      this.counter =  this.counter - 1; 
      this.slider = this.sliderImages[this.counter]; 
  }

  uploadFile(e: any, idx: number): void {     
        let file =  e.target.files[0];
            if( file.type.startsWith('image') || file.type.startsWith('video') ) {

              const url = URL.createObjectURL(file);
              const sanitizedUrl = this.sanitize.bypassSecurityTrustUrl(url); 
      
              this.slider[idx]['img'] =  sanitizedUrl;
              this.slider[idx]['file'] =  file;

              this.sliderImages[this.counter][idx]['img'] = sanitizedUrl;
              this.sliderImages[this.counter][idx]['file'] = file;   

              this.result.emit({
                slider: this.sliderImages,
                _case: 'add'
              });

      }
   
      if( this.submitted ) {
        this.checkHasError();
      }
  };

  //Delete
  deleteImage(idx: number) {
    
    this.result.emit({
        deletedId: this.sliderImages[this.counter][idx]['id'],
       _case: 'delete'
    });
     this.sliderImages[this.counter][idx]['img'] = null;
     this.sliderImages[this.counter][idx]['file'] = null;
     this.slider.splice( idx, 1 );
     
     this.slider.push({img: null, id: '', file: {}});
     if( this.submitted ) {
           this.checkHasError();
     }
  };


  drop(event:CdkDragDrop<string>){
      moveItemInArray(this.slider,event.previousIndex,event.currentIndex);
      moveItemInArray(this.sliderImages[this.counter],event.previousIndex,event.currentIndex);
  };

  
  checkHasError() {
    this.submitted = true;

    const filterd =  this.sliderImages.map( ( item, i ) => {
        return  item.filter( img => img.img )
      } ).filter( file => file.length > 0 )
    filterd.length > 0 ? this.errors = false : this.errors = true ; 
    return this.errors;

  };


   

 
}
