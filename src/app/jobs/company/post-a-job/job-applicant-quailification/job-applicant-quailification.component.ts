import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { FormGroup, FormBuilder, Form, AbstractControl } from '@angular/forms';
import { IJobQualification } from 'src/app/_shared/models/jobs/jobs.interface';

@Component({
  selector: 'app-job-applicant-quailification',
  templateUrl: './job-applicant-quailification.component.html',
  styleUrls: ['./job-applicant-quailification.component.scss']
})
export class JobApplicantQuailificationComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;


  @Output() result:EventEmitter<any> = new EventEmitter<any>();
   
  required:FormGroup;
  preterred:FormGroup;

  form:FormGroup;
  modalType:string;
  forms:Object = {};
  
  constructor(
    private f:FormBuilder
  ) {
    
   }

  ngOnInit() {
    /// Init Form ///
    this.required  = this.quailificationForm();
    this.preterred = this.quailificationForm();
  }

  quailificationForm() {
    return this.f.group({
      experience:['experience_unknown'],
        languages:this.f.array([]),
        toolTechnology:this.f.array([]),
        skills: this.f.array([]),
        license:[''],
        education: this.f.array([]),
        work:[''],

    });
  }

  open(type:string){
    this.form = this[type];
    this.modalType = type;
    this.modal.open();
    this.modal.title = "Add Quailification";
  }

  getQualification(quailification:IJobQualification) {
      this.modal.close();
      
      let { _type }  = quailification;

      this.forms[_type] = quailification;

      this.result.emit(this.forms)
  }

}
