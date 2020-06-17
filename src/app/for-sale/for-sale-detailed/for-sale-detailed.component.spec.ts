import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleDetailedComponent } from './for-sale-detailed.component';

describe('ForSaleDetailedComponent', () => {
  let component: ForSaleDetailedComponent;
  let fixture: ComponentFixture<ForSaleDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSaleDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
