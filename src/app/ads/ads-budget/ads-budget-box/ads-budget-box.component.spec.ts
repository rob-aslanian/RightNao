import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsBudgetBoxComponent } from './ads-budget-box.component';

describe('AdsBudgetBoxComponent', () => {
  let component: AdsBudgetBoxComponent;
  let fixture: ComponentFixture<AdsBudgetBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsBudgetBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsBudgetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
