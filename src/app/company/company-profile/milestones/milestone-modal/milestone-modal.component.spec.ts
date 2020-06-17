import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneModalComponent } from './milestone-modal.component';

describe('MilestoneModalComponent', () => {
  let component: MilestoneModalComponent;
  let fixture: ComponentFixture<MilestoneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
