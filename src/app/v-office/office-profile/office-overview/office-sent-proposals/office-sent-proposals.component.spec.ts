import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSentProposalsComponent } from './office-sent-proposals.component';

describe('OfficeSentProposalsComponent', () => {
  let component: OfficeSentProposalsComponent;
  let fixture: ComponentFixture<OfficeSentProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeSentProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSentProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
