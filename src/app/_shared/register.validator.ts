import { FormGroup, ValidatorFn, AbstractControl, Validators } from '@angular/forms';


export class PasswordValidation {

  static MatchPassword(AC: FormGroup) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
    
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
     
      return null
    }
  }

  static strong(AC: FormGroup) {
    let password = AC.get('password').value;
  
    let hasNumber = /\d/.test(password.value);
    let hasUpper = /[A-Z]/.test(password.value);
    let hasLower = /[a-z]/.test(password.value);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return null;
  }


  static detectUppercase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let regexUppercase = /[A-Z]/g;
      let testUppercase = regexUppercase.test(value);
      return !testUppercase ? { 'uppercase': 'inValid' } : null;
    }

  }  
  static detectString(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if(!!value){
        let regexSymbols =  /\b[A-Z a-z]\b/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'text': 'inValid' } : null;
      }
      return null;
    }

  }
  static detectLetterAnNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if(!!value){
        let regexSymbols =  /\b\w+\b/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'text': 'inValid' } : null;
      }
      return null;
    }

  }
 

  static detectNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let regexNumbers = /[0-9]/g;
      let testNumbers = regexNumbers.test(value);
      return !testNumbers ? { 'number': 'inValid' } : null;
    }
  }
  static detectIfhasNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let regexNumbers = /[0-9]/g;
      let testNumbers = regexNumbers.test(value);
      return testNumbers ? { 'number': 'inValid' } : null;
    }
  }

  static detectSymbols(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let regexSymbols = /[@$!^]/g;
      let testNumbers = regexSymbols.test(value);
      return !testNumbers ? { 'symbols': 'inValid' } : null;
    }

  }


  static detectInitials(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let group = control.parent;

      if (group) {
        let firstname = group.controls['firstname'].value;
        let lastname = group.controls['lastname'].value;
        let email =  group.controls['email'].value  !== null ? 
                    group.controls['email'].value.split("@")[0] : null;

        let regexInitials = new RegExp(`(?=.*${firstname})|(?=.*${lastname})|(?=.*${email})`, 'gi');
        let testInitials = regexInitials.test(value);

        return testInitials ? { 'initials': 'inValid' } : null;
      }

      return null;

    }

  }

  static detectLength(len?:number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let testlength = value.length > len;
      return !testlength ? { 'minLength': 'inValid' } : null;
    }

  }

  static detectAnySymbols(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if(!!value){
        let regexSymbols = /^[a-z-\s]+$/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'symbols': 'inValid' } : null;
      }
      return null;
    }

  }

  static detectEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;

      if(!!value){
        let regexSymbols = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/gmi;
        let testEmail = regexSymbols.test(value);

        return !testEmail ? { 'email': 'inValid' } : null;
      }

      return null;
      
    }
  }

  static detectURL(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;

      if(value === '') return null;

      if(value !== null && value){
        let regexSymbols =  /(https:?:)?(\/\/)?(w{3}\.)?(\w{2,19}\.)(\w{1,12}(\.\w+)?)\/*\S+/gi;///^(http[s]?:\/\/){0,1}(www\.){0,1}[a-z0-9\.\-]+\.[a-z]{2,5}[\.]{0,1}/gi;
        let testEmail = regexSymbols.test(value);

        return !testEmail ? { 'url': 'inValid' } : null;
      }
      return null;
    }
  }

  static ageFrom(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value
      
      if(value === '') return null;
      
      if(value) {
        return value>=13 && value<=120 ? null : { 'from': 'inValid' };
      }
      return null;

    }
  }

  static ageTo(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;

      if(value === '') return null
      if(value) {
        return value<=120 && value>=13 ? null: { 'to': 'inValid'} 
      }
      return null;
    }
  }

  static detectOnlySpaces(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      let regexSymbols = /^[^-\s][\W\w-\s]+$/gmi;
      let testOnlySpaces = regexSymbols.test(value);

      return !testOnlySpaces ? { 'onlySpaces': 'inValid' } : null;
    }
  }
  
  static detectOnlyEnglishCharacters(lang?:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;

      
      if(!!value && lang !== 'en'){
        let regexSymbols = /^[A-Za-z0-9\s-!@#$%&*()_+|~=`{}:";'<>?,.~(){}\/^\|\[\]\\]+$/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'symbolsAndLatin': 'inValid' } : null;
      }
      return null;
    }
  }
  static detectLanguageDashSpace(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;

      if(Array.isArray(value) && value.length === 0) return null;

      if(!!value){
        let regexSymbols = /^[a-zA-Z\s-]+$/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'dashSpaceAndLatin': 'inValid' } : null;
      }
      return null;
    }

  }
  static detectEnglishDashSpace(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if(!!value){
        let regexSymbols = /^[a-zA-Z\s0-9-]+$/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'dashSpaceAndLatin': 'inValid' } : null;
      }
      return null;
    }

  }

  static detectNumberAndSymbols(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if(!!value){
        let regexSymbols = /^[0-9-\s]+$/gim;
        let testNumbers = regexSymbols.test(value);
        return !testNumbers ? { 'numberAndSymbol': 'inValid' } : null;
      }
      return null;
    }
  }

  static validateMin(max:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null  => {
      let value = control.value,
          parent = control.parent;

      if(!!value){
        let maxValue = parent.get(max);
         maxValue.updateValueAndValidity();
         
         control.value >  maxValue.value ? 
                          maxValue.setValidators([Validators.min(control.value)]) : 
                          maxValue.setValidators(null) ;
      }
      return null;
    }

  }

  static validateMax(min:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null  => {
      let value = control.value,
          parent = control.parent;

      if(!!value){
        let minValue = parent.get(min);
        minValue.updateValueAndValidity();
         
         control.value > minValue.value ? 
                         minValue.setValidators([Validators.min(control.value)]) : 
                         minValue.setValidators(null) ;
      }
      return null;
    }

  }
}
