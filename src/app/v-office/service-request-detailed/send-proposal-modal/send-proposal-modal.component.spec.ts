import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendProposalModalComponent } from './send-proposal-modal.component';

describe('SendProposalModalComponent', () => {
  let component: SendProposalModalComponent;
  let fixture: ComponentFixture<SendProposalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendProposalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendProposalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
