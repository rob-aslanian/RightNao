import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsFormComponent } from './buildings-form.component';

describe('BuildingsFormComponent', () => {
  let component: BuildingsFormComponent;
  let fixture: ComponentFixture<BuildingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
