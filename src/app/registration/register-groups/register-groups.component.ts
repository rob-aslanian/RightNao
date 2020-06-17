import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { groupsEnum, IGroupRegistration } from 'src/app/_shared/models/groups/groups.model';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GroupsService } from 'src/app/groups/shared/services/groups.service';


@Component({
  selector: 'app-register-groups',
  templateUrl: './register-groups.component.html',
  styleUrls: ['./register-groups.component.scss']
})

export class RegisterGroupsComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  submitted: boolean = false;
  groupsEnum: any = groupsEnum;
  groupKeys: string[] = Object.keys(groupsEnum);
  $destroy: Subject<any> = new Subject<any>();

  constructor(
     private fb: FormBuilder,
     private sharedService: UtilsService,
     private groupService:  GroupsService
  ) { 
   this.registerForm =  this.fb.group({
                          name: ['', Validators.required],
                          type: ['', Validators.required], 
                          privacy_type:  ['public']
                        })
  }

  ngOnInit() {

    // Validate if Url for group isnot taken
     this.registerForm
                     .get('name')
                     .valueChanges
                     .pipe(
                      debounceTime( 500 ),
                      distinctUntilChanged(), 
                      switchMap( (url) => {
                          return this.groupService
                                  .checkIfGroupUrlIsTaken( url )
                     })).subscribe( ({ data }) => {
                           let isTaken = data['IsGroupURLBusy'];
                           if( isTaken ) this.registerForm.get('name').setErrors({ exists: true })
                     });
  }
  
  get forCtrls() {
     return this.registerForm.controls;
  }

  submit() {

    
      this.submitted = true;
      if( !this.registerForm.valid ) {
          return ;
      }
      console.log(this.registerForm.errors);
      const { name, type, privacy_type } = this.registerForm.controls;
      const input: IGroupRegistration = { name: name.value, type: type.value, privacy_type: privacy_type.value };

      this.sharedService
        .registerGroups(input)
        .pipe( takeUntil( this.$destroy ) )
          .subscribe( data => {
          } );
  }

    ngOnDestroy() {
      this.$destroy.next();
      this.$destroy.complete();
    }  

}
