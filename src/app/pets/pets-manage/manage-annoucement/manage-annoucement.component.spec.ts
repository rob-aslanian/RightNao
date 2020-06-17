import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnnoucementComponent } from './manage-annoucement.component';

describe('ManageAnnoucementComponent', () => {
  let component: ManageAnnoucementComponent;
  let fixture: ComponentFixture<ManageAnnoucementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAnnoucementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
