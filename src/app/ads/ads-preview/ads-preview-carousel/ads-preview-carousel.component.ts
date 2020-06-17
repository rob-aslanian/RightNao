import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AdsCreateService } from '../../ads-create/ads-create.service';

@Component({
  selector: 'app-ads-preview-carousel',
  templateUrl: './ads-preview-carousel.component.html',
  styleUrls: ['./ads-preview-carousel.component.scss']
})
export class AdsPreviewCarouselComponent implements OnInit {


  user;
  cards;
  translate:number = 1;
  transMaxLength:number = 415;
  @ViewChildren( 'card' ) cardss: QueryList<ElementRef>;

  constructor(
    private userProService:GlobalUserProService,
    private adsCreateService:AdsCreateService
  ) {
    this.user = userProService.getUserProfile();
   }

  ngOnInit() {
    this.adsCreateService.adsContent
                        .subscribe( (data) => {
                          this.cards = data['cards'];
                          if(this.cardss) {
                             this.defTranslate();
                             this.transMaxLength = (415 * this.cardss.length) - 415;
                          }
                        })
                        // this.transMaxLength = (415 * this.cardss.length) - 415;

  }
  

  nextCard() {
    this.translate += 415;
    this.cardss.forEach( (card) =>  {
      card.nativeElement.style.transition = `0.5s`
      card.nativeElement.style.transform = `translate(-${this.translate}px, 0)`; 
  }) 
    this.transMaxLength = (415 * this.cardss.length) - 415;
  }
  prevCard() { 
    this.translate -= 415;
    this.cardss.forEach( (card) =>  {
      card.nativeElement.style.transition = `0.5s`
      card.nativeElement.style.transform = `translate(-${this.translate}px, 0)`; 
  }) 
  this.transMaxLength = (415 * this.cardss.length) - 415;
  }

  defTranslate() {
    this.cardss.forEach( (card) =>  {
      card.nativeElement.style.transition = `0`;
      card.nativeElement.style.transform = `translate(-${this.translate}px, 0)`; 
  }) 
  }

  test() {
    this.adsCreateService.adsContentForm.get('cards');

    console.log(this.adsCreateService.adsContentForm.get('cards').value);

    console.log('files', this.adsCreateService.files);
    
    
  }

}
