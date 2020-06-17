import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeScript, SafeStyle, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(
    private sanitaraizer:DomSanitizer
  ){}

  transform(value: any, type?: string): SafeHtml | SafeScript | SafeStyle | SafeUrl | SafeResourceUrl {
   switch(type){
     case'html': return this.sanitaraizer.bypassSecurityTrustHtml(value);
     case'css': return this.sanitaraizer.bypassSecurityTrustStyle(value);
     case'url': return this.sanitaraizer.bypassSecurityTrustUrl(value);
     case'script': return this.sanitaraizer.bypassSecurityTrustScript(value);
     case'resourseUrl': return this.sanitaraizer.bypassSecurityTrustResourceUrl(value);
     default:throw new Error(`Invalid ${type} value`);

   }
  }

}
