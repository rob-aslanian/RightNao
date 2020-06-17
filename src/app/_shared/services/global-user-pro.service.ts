import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ICompanyProfile, ICareerCenter } from '../models/company/companyProfile.interface';
import { IUserProfile, ISavedUser } from '../models/user/userProfile.interface';
import { UtilsService } from './shared/utils.service';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalUserProService {

  // Observable source
  profileUpdated = new Subject<IUserProfile | ICompanyProfile>();
  profileUpdatedSource$ = this.profileUpdated.asObservable();

  // show userProfile wall tags Recommendations.comp.ts
  borrowerChanged = new BehaviorSubject<boolean>(false);
  borrowerChangedObservable = this.borrowerChanged.asObservable();
  expiredDate:number = new Date().getDate() + 14;

  constructor( 
    private cookieService: CookieService,
    private router:Router,
    private utilService:UtilsService,
    private messageService:ListenersService
    ) { }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('url_id') && !!this.cookieService.get('token_user');
  }

  userLoggedIn(remember: boolean, data: any ,country?:string): boolean {
    var expireDate = new Date();
    //set expire data after 14 days if remember is true else keep it for 24 hours
    expireDate.setDate(expireDate.getDate() + 14);


    this.cookieService.set('token_user', data.token, expireDate, '/');
    this.cookieService.set("url_id", data.url, expireDate, '/');
    this.cookieService.set("user_id", data.id, expireDate, '/'); 
   

    //Set user profile in local-storage and sets active profile as user 
    this.setLanguage('en')
    this.setLocation(country);
    this.storeUserProfile({ 
      id: data.id,
      url: data.url ,
      is_2fa_requeried:data.is_2fa_requeried,
      avatar: data.avatar,
      name: `${data.first_name} ${data.last_name}`,
      gender: data.gender,
      email:data.email,
    });
    return true;
  }
  
  storeUserProfile(userProfile: IUserProfile  | string) {
    localStorage.setItem('user_profile', JSON.stringify(userProfile));

    this.switchToUserProfile();
    
    if (typeof userProfile !== 'string') {
      this.profileUpdated.next(userProfile);
    }
  }

  storeCompanyProfile(companyProfile: any) {
    this.cookieService.set('company_id' , companyProfile.id , this.expiredDate , '/' )
    localStorage.setItem('company_profile', JSON.stringify(companyProfile));
    
    this.switchToCompanyProfile();
    this.profileUpdated.next(companyProfile);
    
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem('user_profile'));
  }

  getCompanyProfile() {
    return JSON.parse(localStorage.getItem('company_profile'));
  }

  getCompanyCareerCenter() : ICareerCenter {
    return this.getCompanyProfile()['career_center']
  }

  get hasCareerCenter() : boolean {
    if (this.isCompanyActive()) {
      const careerCenter = this.getCompanyCareerCenter();

      return careerCenter.title !== "" || 
             careerCenter.description !== "";
    }
    return false;   
  }

  getProfile(){
    return this.isAuthenticated() && this.isCompanyActive() ?
           this.getCompanyProfile() : this.getUserProfile();
  }

  switchToCompanyProfile() {
    if (this.isAuthenticated()) { localStorage.setItem('isCompanyActive', "true"); }
  }

  switchToUserProfile() {
    if (this.isAuthenticated()) { 
      this.cookieService.delete('company_id' , '/' );
      localStorage.setItem('isCompanyActive', "false");
     }
  }

  isCompanyActive(): boolean {
    return this.isAuthenticated() && localStorage.getItem('isCompanyActive') === "true";
  }

  getComapnyId(){
    return (this.isAuthenticated() && this.isCompanyActive()) && JSON.parse(localStorage.getItem('company_profile'))['id'];
  }

  getUserId() {
    return this.cookieService.get('url_id');
  }

  getProfileNameAndAvatar() {
     const name   = this.getProfile()['name'],
           avatar = this.getProfile()['avatar'];

     return { name , avatar }
  }


  getEmail() {
    return this.getUserProfile()['email'];
  }

  getProfileId(){
     return ( this.isCompanyActive() ? 
              this.getComapnyId() : 
              this.getUserProfile()['id'] ) || null;
  }

  getProfileAvatar() : string {
    let profile = this.isCompanyActive() ?
                  this.getCompanyProfile() : /// Company
                  this.getUserProfile(); /// User

    return profile['avatar'] ? '/file/' + profile['avatar']  : 
           this.isCompanyActive() ? 'assets/img/default-company.svg' : 'assets/img/124.svg';
  }

  getProfileName() : string {
    return this.isCompanyActive() ? 
           this.getCompanyProfile()['name'] : this.getUserProfile()['name'];
  }

  updateUserProfile(userProfile:IUserProfile) {
    let user_profile = this.getUserProfile();
    user_profile["avatar"] = userProfile.avatar || userProfile.avatar === "" ?
                             userProfile.avatar : user_profile['avatar'];


    user_profile["name"] = userProfile.name || user_profile['name'];
    user_profile["is_2fa_requeried"] = userProfile.is_2fa_requeried || user_profile['is_2fa_requeried'];
    user_profile["has_vOffice"] = userProfile.has_vOffice || user_profile['has_vOffice'];
    user_profile["network_info"] = userProfile.network_info || user_profile['network_info'];
    user_profile["companies"] = userProfile.companies || user_profile['companies'];




    this.updateSavedUser(user_profile['id'] , userProfile);
    this.storeUserProfile(user_profile);
  }

  updateCompanyProfile(companyProfile:ICompanyProfile){
    let company_profile:ICompanyProfile = this.getCompanyProfile();

    company_profile["avatar"] = companyProfile.avatar || companyProfile.avatar === "" ?
                             companyProfile.avatar : company_profile['avatar'];
                             
    company_profile["name"] = companyProfile.name || company_profile["name"];
    company_profile["url"] = companyProfile.url || company_profile["url"];
    company_profile["industry"] = companyProfile.industry || company_profile["industry"];
    company_profile["career_center"] = companyProfile.career_center || company_profile['career_center'];

    this.storeCompanyProfile(company_profile);
  }


  saveUser(user:ISavedUser) {
    let users:ISavedUser[] = JSON.parse(localStorage.getItem('__users')) || [];


    if(user && users.every(usr => usr.username !== user.username) ){
      users = users.filter(usr => usr.username !== user.username);
      localStorage.setItem('__users' , JSON.stringify([user , ...users]));
    }
  }

  updateSavedUser(userId:string , changes:ISavedUser = {}) : void {
    let users:ISavedUser[] = this.getSavedUser() || [];

    if(users && users.length > 0){
      let currentUser = users.find(user => user.id === userId);

      if(currentUser){
        Object.keys(currentUser)
              .map(key => {
                currentUser['lastVisit'] = new Date().getTime(),
                currentUser[key] = changes[key] || currentUser[key];
                currentUser['avatar'] = changes['avatar'] || changes.avatar === "" ?
                                         changes['avatar'] : currentUser['avatar'];
              });

        localStorage.setItem('__users' , JSON.stringify([...users]))
      }
    }

  }

  removeSavedUser(id:string){
    let users:ISavedUser[] = this.getSavedUser() || [];

    if(users && users.length > 0){
      let indexOfUser = users.findIndex(usr => usr.id === id);
      users.splice(indexOfUser , 1);

      localStorage.setItem('__users' , JSON.stringify([...users]))

      users.length === 0 ? localStorage.removeItem('__users') : null;
      

    }
  }


  getSavedUser(){
    if(localStorage.getItem('__users')){
      let users:ISavedUser[] = JSON.parse(localStorage.getItem('__users'));

      return users.sort((a , b) => a.lastVisit < b.lastVisit ? 1 : -1)
    }

    return undefined;

    // return localStorage.getItem('__users')  && JSON.parse(localStorage.getItem('__users'));
  }

  setLanguage(lang:string = 'en'){
    let expireDate = new Date();
    expireDate.setDate((expireDate.getDate() + 14));
    
    return this.cookieService.set('selected_lang' , lang , expireDate , '/');
  }

  getLanguage(){
    return this.cookieService.get('selected_lang');
  }

  setInterfaceLang(lang:string = 'en'){
    let expireDate = new Date();
    expireDate.setDate((expireDate.getDate() + 14));
    
    return this.cookieService.set('interface_lang' , lang , expireDate , '/');
  }

  getInterfaceLang() : string {
    return this.cookieService.get('interface_lang') ? 
           this.cookieService.get('interface_lang') : 'en';
  }

  setLocation(country:string){
    return localStorage.setItem('location' , !!country ? country : 'GE' )
  }

  set setInviterID(inviter_id:string) {
     localStorage.setItem('_inviterID' , inviter_id);
  }

  get getInviterID(){
    return localStorage.getItem('_inviterID') || undefined;
  }

  removeInviterID(){
    return localStorage.removeItem('_inviterID');
  }

  get location(){
    return localStorage.getItem('location') || 'GE';
  }

  clear() {
    // delete cookie
    this.cookieService.deleteAll('/');

    localStorage.removeItem('user_profile');
    localStorage.removeItem('company_profile');
    localStorage.removeItem('isCompanyActive');

    // clear local storage - clears user-profile, company-profile and switches to user profile
   this.storeUserProfile('');
  }

  signOut(){

      this.utilService
            .signOut()
            .subscribe(
              () => {
                this.clear();
                this.router.navigate(['/']);

                if(this.messageService.messagingWebSocket){
                  this.messageService.messagingWebSocket.close();
                  this.messageService.messagingWebSocket = undefined;
                }

              },
              (err) => this.router.navigate(['/']),
              () => this.router.navigate(['/'])
          )
 
  }

}
