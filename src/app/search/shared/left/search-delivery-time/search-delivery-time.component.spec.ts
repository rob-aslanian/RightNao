import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDeliveryTimeComponent } from './search-delivery-time.component';

describe('SearchDeliveryTimeComponent', () => {
  let component: SearchDeliveryTimeComponent;
  let fixture: ComponentFixture<SearchDeliveryTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDeliveryTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDeliveryTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
