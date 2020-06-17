import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSavedRequestsComponent } from './office-saved-requests.component';

describe('OfficeSavedRequestsComponent', () => {
  let component: OfficeSavedRequestsComponent;
  let fixture: ComponentFixture<OfficeSavedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSavedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSavedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
