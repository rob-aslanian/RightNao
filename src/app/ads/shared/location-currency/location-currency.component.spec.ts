import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCurrencyComponent } from './location-currency.component';

describe('LocationCurrencyComponent', () => {
  let component: LocationCurrencyComponent;
  let fixture: ComponentFixture<LocationCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
