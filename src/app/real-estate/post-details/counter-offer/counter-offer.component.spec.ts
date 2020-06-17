import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOfferComponent } from './counter-offer.component';

describe('CounterOfferComponent', () => {
  let component: CounterOfferComponent;
  let fixture: ComponentFixture<CounterOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
