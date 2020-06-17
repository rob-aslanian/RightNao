import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsImageComponent } from './ads-image.component';

describe('AdsImageComponent', () => {
  let component: AdsImageComponent;
  let fixture: ComponentFixture<AdsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
