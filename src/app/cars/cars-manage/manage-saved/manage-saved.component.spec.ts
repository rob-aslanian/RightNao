import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSavedComponent } from './manage-saved.component';

describe('ManageSavedComponent', () => {
  let component: ManageSavedComponent;
  let fixture: ComponentFixture<ManageSavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
