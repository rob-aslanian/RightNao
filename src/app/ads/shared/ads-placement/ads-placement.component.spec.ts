import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPlacementComponent } from './ads-placement.component';

describe('AdsPlacementComponent', () => {
  let component: AdsPlacementComponent;
  let fixture: ComponentFixture<AdsPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
