import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragesFormComponent } from './garages-form.component';

describe('GaragesFormComponent', () => {
  let component: GaragesFormComponent;
  let fixture: ComponentFixture<GaragesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaragesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
