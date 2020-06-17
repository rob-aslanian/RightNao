import industries from "src/assets/data/en/industries";
import countries from "src/assets/data/en/countries";
import { LanguageNames } from "src/assets/data/en/language";
import { Currencies } from "src/assets/data/en/currencies";
import { FileIcons } from "../models/shared/shared.models";
import { companyEmployee, companyType } from "../models/company";
import { ExperienceYears } from "src/app/jobs/models/userJobs.model";
import { ratingModel } from "../components/company/write-review/Models/model";
import { UserBoxActions } from "../components/jobs/user-box/userbox.models";
import {USER_PROFILE_TEXT} from '../../../assets/data/en/user/user-profile';
 



import * as moment from 'moment';


export class utilities {
  private static imageUrl;
  private static imageUrlPatch;
  private static reader;

  public static uploadImage(files) {
    if (files.length === 0) {
      return;
    }

    this.reader = new FileReader();
    this.imageUrlPatch = files;
    this.reader.readAsDataURL(files[0]);
    this.reader.onload = _event => {
        
      this.imageUrl = this.reader.result;
      return this.imageUrl;
    };
  }

  public static scrollIntoView(el:HTMLElement){
    return el &&  el.scrollIntoView({ behavior:"smooth" , block:"start" , inline:'center'});
  }

  public static  getDate(mileSeconds:object):object{

        let createdAt = new Date(mileSeconds['created_at'] * 1000);
        let responededAt = new Date(mileSeconds['responded_at'] * 1000);
        return { 
          createdAt,
          responededAt
        };
  }
  
  public static parseSubIndustries(subindustries:any[] , industryID){
      if(subindustries && subindustries.length > 0 && industryID){
        return subindustries.map(sub =>  {
            let industry =  industries.find(ind => ind.id == industryID);
            let subs = industry.subindustries.find(el => el.id === sub);
            
            return subs ? subs.name : null;
        });

      }
  }
  public static bytesToMB(size:number) : number {
    return +(size / 1024 / 1024).toFixed(2);
  }

  public static getInudsryName(indId:string){
    let indName = industries.find(ind => ind.id === indId);
    return indName ? indName.name : '';
  }

  public static getCompanySizeName(size:string){
    if(!size) return;
    
    return companyEmployee[size] ? companyEmployee[size] : ''
  }

  public static getCompanyType(type:string){
    if(!type) return;
    
    return companyType[type] ? companyType[type] : ''
  }

  public static getExerienceName(expId:string) {
    if(!expId || expId === 'experience_unknown') return;

    let expName = ExperienceYears.find(exp => exp.id === expId);

    return expName ? expName.name : '';
  }


  public static getLanguage(langAbbr:string){
    let langs = new LanguageNames().all_languages;
    // langAbbr = langAbbr.toLocaleLowerCase();

    if(langs[langAbbr]){
      return langs[langAbbr];
    }

    return '';
  }

  public static getCountryName(countyAbbr:string){
     if(countries[countyAbbr]){
       return countries[countyAbbr];
     }
     return '';
  }

  public static getAllCurency() : string[]{
    return Object.keys(Currencies).map(key => {
      return Currencies[key].AlphabeticCode;
    })
  }

  public static filesType(name:string) : string{
    if(name === null) return;
    
    let fileType = name.includes('.') ? 
                      name.split('.') :
                      name.split('/');

    return fileType[fileType.length - 1].toLowerCase();
  }

  public static getScore(score:string) {
    return ratingModel[score] ? ratingModel[score] : 0;
  }

  public static setIconByType(name?:string){
     let type = this.filesType(name);

     return FileIcons[type] ? FileIcons[type].icon : FileIcons['_other'].icon;
  }

  public static setJobCategoryIcon(category:string) {
    let currentAction = UserBoxActions.find(action => action.id === category);


    return currentAction ? currentAction.icon : 'assets/img/165.svg';
  }

  public static getExperienceScrore(exp:string){
    let score = ExperienceYears.find(_exp => _exp.id === exp);

    return score ? score._score : 0;
  }

  public static isToday(date:Date) {
    let today = new Date();

    return date.getDate()  === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  public static getUserProfileText(type:string , key?:string){

    if(!type) return;

    return USER_PROFILE_TEXT[type][key];

  }
  public static getUserProfileErrors(type:string,errorType:string):Object{
       return  USER_PROFILE_TEXT[type][errorType]
  }

  public static getUrl(url:string) : string{
    if(url.startsWith('http://') || url.startsWith('https://')) return url;

    return 'https://' + url;
  }


  public static $getErrors(err:string) : string {
    return USER_PROFILE_TEXT['validators'][err];
  }

  public static getErrorsKey(object:object) : string[] {
    return Object.keys(object);
  } 

  public static maxNumberLenght(e , max:number = 32){
    let target = e.target;

    return target.value.length >= max && 
          (e.keyCode >= 49 && e.keyCode <= 57) ? false : true;
    
  }

  public static dateFromNow(date:string | Date){
  
    return moment(date).fromNow();
  }

  

  public static dateFromTo(from:string | Date , to:string | Date , prefix:boolean = true){

    /// From date 
    if(typeof from === 'string'){
      from = moment(from , 'M-YYYY').toDate();
    }

    /// To date 
    if(to && to !== '' && typeof to === 'string'){
      to = moment(to , 'M-YYYY').toDate();
    }
    else { to = new Date()}

    return moment(from).from(to , prefix);
    
  }
 public static changeImageForSessions(type:string):string{
      if(type === 'Phone'){
           return 'assets/img/85.svg';
      }
      else if(type === 'Computer'){
           return 'assets/img/86.svg';
      }
      else{
         return 'assets/img/193.svg';
      }
  }

  public static get getLocationLink() :  string {
    return `${location.protocol}//${location.host}`;
  }

  public static getFileMimeType(str:string){
   
      return  str ? str.split('/')[0] : '';     
  }

  public static get isMobile() : boolean {
    return /Android|webOs|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
  }
   
 public static getImageForEmail( email: string ): any {

  let Email = email.split('@')[1].split('.')[0].toLowerCase();
    switch ( Email  ) {
      case 'gmail':{
          return {
            img:"assets/img/gmail-logo.png",
            text:"Gmail"
          } 
        }
      case 'yahoo':{
        return {
          img:"assets/img/yahoo-logo.png",
          text:"Yahoo"
        } 
        
      }
      case 'mailcom':{
        return {
          img:"assets/img/mailcom.png",
          text:"Mail"
        } 
        
      }
      case 'outlook':{
        return {
          img:"assets/img/outlook.png",
          text:"Outlook"
        } 
        
      }
      case 'protonmail':{
        return {
          img:"assets/img/protonmail.png",
          text:"ProtonMail"
        } 
        
      }
      case 'yandex':{
        return {
          img:"assets/img/yandex.png",
          text:"Yandex"
        } 
        
      }
       case 'zohomail':{
        return {
          img:"assets/img/zohomail.png",
          text:"ZohoMail"
        } 
        
      }
      default:{
           return {
              img:"assets/img/other_mail.svg",
              text:Email
           }
      }       
    }


 }

 /**
  * 
  * @param array objects of user 
  * @param key  prefer to be key id 
  */
 public static removeDublicates(  array: any[] , key: string) {
    const uniqueUsers = new Map();
    
      array.map( prof => {
          uniqueUsers.set( prof[key], prof ); 
      });

     return Array.from(uniqueUsers.values())

 };

public static addFilesInFormData( files: Blob[] ): FormData {
      const formData = new FormData();

      files.map( ( file ) => {
            if( file ) {
                formData.append( 'file', file );
            }
        } )
      
      return formData;

 };


 public static getToday() {
      const date = new Date();
      const day =  date.getDate() , 
      month = date.getMonth() + 1,
      year  = date.getFullYear();

      return {  day, month, year }
 }
  

}
