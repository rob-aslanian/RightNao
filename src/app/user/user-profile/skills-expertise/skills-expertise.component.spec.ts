import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsExpertiseComponent } from './skills-expertise.component';

describe('SkillsExpertiseComponent', () => {
  let component: SkillsExpertiseComponent;
  let fixture: ComponentFixture<SkillsExpertiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsExpertiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
