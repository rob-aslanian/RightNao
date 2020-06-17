import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExperienceYears } from 'src/app/jobs/models/userJobs.model';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import degress from 'src/assets/data/en/degries';
import { IJobQualification, IJobQualificationLanguage, IJobQualificationTool } from 'src/app/_shared/models/jobs/jobs.interface';

@Component({
  selector: 'app-job-qualification-modal',
  templateUrl: './job-qualification-modal.component.html',
  styleUrls: ['./job-qualification-modal.component.scss']
})
export class JobQualificationModalComponent implements OnInit {

  @Input() form:FormGroup;
  @Input() type:string;

  @Output() result:EventEmitter<IJobQualification> = new EventEmitter<IJobQualification>();

  experienceLevels = ExperienceYears;
  
  constructor(
    private f:FormBuilder
  ) { }

  ngOnInit() {
  }

  get educations(){
    return this.form.get('education') as FormArray;
  }


  searchgDegree = (text:Observable<string>) => 
    text.pipe(
      distinctUntilChanged(),
      // filter(val => val.length >= 2 ),
      map(degree =>  (degree === '' ? degress
        : degress.filter(val => val.toLowerCase().includes(degree.toLowerCase())).slice(0,15) )
      )
  )


  onSelectDegree(event: any) {
    event.preventDefault();
    
    this.addEducation(event.item);

  }

  addEducation(value: string) {

    if(!value.match(/^\W+$/) && value !== ''){
      this.educations.push(this.f.control(value));
    }
  
  }

  removeEducation(idx: any) {
    this.educations.removeAt(idx);
  }

  submit(){
     let { education , experience ,  languages , 
          license , skills ,  toolTechnology , work } = this.form.controls;

    let _educations = (<FormArray>education).controls.map(ed => ed.value),
        _skills     = (<FormArray>skills).controls.map(skill => skill.value['skill']),
        _languages  = (<FormArray>languages).controls.map(skill => { 
                          return { 
                            language:skill.get('language').value,
                            rank:skill.get('rank').value
                          } as IJobQualificationLanguage
                      }),
        _tools      =  (<FormArray>toolTechnology).controls.map(tool => {
                          return {
                            tool:tool.get('tool_Technology').value,
                            rank:tool.get('rank').value
                          } as IJobQualificationTool
                       });


    return this.result.emit({
      education:_educations,
      languages:_languages,
      skills:_skills,
      tools:_tools,
      experience:experience.value,
      license:license.value,
      work:work.value,

      _type:this.type,
    })
    
  }

}
