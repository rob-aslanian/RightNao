import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountedModalComponent } from './discounted-modal.component';

describe('DiscountedModalComponent', () => {
  let component: DiscountedModalComponent;
  let fixture: ComponentFixture<DiscountedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
