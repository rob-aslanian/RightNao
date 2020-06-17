import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsModalComponent } from './benefits-modal.component';

describe('BenefitsModalComponent', () => {
  let component: BenefitsModalComponent;
  let fixture: ComponentFixture<BenefitsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
