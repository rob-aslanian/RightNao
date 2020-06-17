import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { groupsEnum } from 'src/app/_shared/models/groups/groups.model';
import { GroupsService } from 'src/app/groups/shared/services/groups.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general-settings-input',
  templateUrl: './general-settings-input.component.html',
  styleUrls: ['./general-settings-input.component.scss']
})
export class GeneralSettingsInputComponent implements OnInit, OnDestroy {

    
    toggleSettings: any = {
      name:    false,
      type:    false,
      privacy: false,
      url:     false
  };

    groupsEnum: any = groupsEnum;
    groupKeys: string[] = Object.keys(groupsEnum);
    settingsForm: FormGroup;
    $destroy: Subject<any> = new Subject<any>();

  constructor(
     private fb: FormBuilder,
     private groupService: GroupsService
  ) {
  
  this.settingsForm =   this.fb.group({
                          name: [''],
                          privacy_type: ['public'],
                          url: [''],
                          type: ['']
                        })

   }

  ngOnInit() {
  }


  expandSettings( type: string  ) {
 
    
    Object.keys( this.toggleSettings ).map( key => {
         if( key === type ) {
           this.toggleSettings[type] = !this.toggleSettings[type];
         } else {
            this.toggleSettings[key] = false;
         }
    });
    
 }



 changeGroupName() {
     const  name: string  = this.settingsForm.get('name').value;
     const trimmedName = name.trim();

     this.groupService
      .changeGroupName('5dc8f6d17d8b697f9b37ebec',trimmedName)
       .pipe( takeUntil( this.$destroy ) )
        .subscribe( data => {
            console.log( data  );
            this.expandSettings('name');
        } )
     
 }
 changeGroupPrivacyType() {
   const type = this.settingsForm.get('privacy_type').value;

   this.groupService
    .changePrivactType('5dc8f6d17d8b697f9b37ebec', type)
     .pipe( takeUntil( this.$destroy ) )
      .subscribe( data => {
         this.expandSettings('privacy');
      } )
 }

 savePublicUrl() {
    const url = this.settingsForm.get('url').value;
    
    this.groupService
     .changeGroupURL('5dc8f6d17d8b697f9b37ebec', url)
      .pipe( takeUntil( this.$destroy ) )
       .subscribe( data => console.log(  data  ) )
 }

 ngOnDestroy() {
   this.$destroy.next();
   this.$destroy.complete();
 }
}
