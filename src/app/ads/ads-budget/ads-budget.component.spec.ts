import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsBudgetComponent } from './ads-budget.component';

describe('AdsBudgetComponent', () => {
  let component: AdsBudgetComponent;
  let fixture: ComponentFixture<AdsBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
