import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

// libs
import { map } from 'rxjs/operators';

// services
import { LanguageNames } from '../../../assets/data/en/language';

@Pipe({
    name: 'languagePipe'
})
export class LanguagePipe implements PipeTransform {
    
    constructor(private AllLanguage: LanguageNames) { }
   

    transform(value: string): any {

        let key: any;
        let language: any;

        for ( key in this.AllLanguage.all_languages) {
            if (this.AllLanguage.all_languages.hasOwnProperty(key)) {
                if (key == value) {
                    language = this.AllLanguage.all_languages[key];
                    break;
                }
            }
        }
        return language;

    }

 }