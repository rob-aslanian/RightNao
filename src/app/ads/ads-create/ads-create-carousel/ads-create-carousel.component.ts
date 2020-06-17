import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdsCreateService } from '../ads-create.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ads-create-carousel',
  templateUrl: './ads-create-carousel.component.html',
  styleUrls: ['./ads-create-carousel.component.scss']
})
export class AdsCreateCarouselComponent implements OnInit, OnDestroy {



  carouselForm:FormGroup;
  destroy$:Subject<any> = new Subject<any>();
  contentForm;

  constructor(
    private fb:FormBuilder,
    private adsCreateService:AdsCreateService
  ) { 
    // this.carouselForm = this.fb.group({
    //   name: fb.control(['', Validators.required]),
    //   cards: fb.array([this.initaliazeValue()])
    // });
    this.carouselForm = this.adsCreateService.adsContentForm;
    // this.carouselForm.addControl([cards: fb.array([this.initaliazeValue()])])
    this.carouselForm.addControl('cards', fb.array([this.initaliazeValue()]))
    // this.responsiveForm.addControl('btn', this.fb.control('', Validators.required));
  }
  
  initaliazeValue(): FormGroup {
    return this.fb.group({
      headline:['', Validators.required],
      url:['', Validators.compose([Validators.required, Validators.maxLength(100), PasswordValidation.detectURL()])],
      image: ['', Validators.required]
    });
  }

  get Cards() {
    return this.carouselForm.get('cards') as FormArray;
  }

  ngOnInit() {

    this.removeControls(this.carouselForm);
    

    this.addAnother();

    this.adsCreateService.adsContent.next(this.carouselForm.value);

    this.carouselForm.valueChanges
                      .pipe(
                        takeUntil(this.destroy$),
                        debounceTime(0),
                        distinctUntilChanged()
                        )
                      .subscribe( (data) => { 
                        this.adsCreateService.adsContent.next(data);
                      })
    
  }


  removeControls(form) {
    form.removeControl('url');
    form.removeControl('description');
    form.removeControl('line');
    form.removeControl('image');
  }


  addAnother(){
    this.Cards.push(this.initaliazeValue());
  }

  remove(i:number){
    this.Cards.removeAt(i);
    this.adsCreateService.files.splice(i, 1);
  }
  addCardImage(e) {
    let index = e['index'];
    let src = e['src'];
    this.carouselForm.get('cards')['controls'][index]
                      .get('image').setValue(src);
    
    
  }
  removeCardImage(e) {
    let index = e['index'];
    this.carouselForm.get('cards')['controls'][index]
                      .get('image').setValue('');

    this.adsCreateService.files.splice(index, 1);
        
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  
}
