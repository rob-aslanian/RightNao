import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnnounsementsComponent } from './manage-announsements.component';

describe('ManageAnnounsementsComponent', () => {
  let component: ManageAnnounsementsComponent;
  let fixture: ComponentFixture<ManageAnnounsementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAnnounsementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAnnounsementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
