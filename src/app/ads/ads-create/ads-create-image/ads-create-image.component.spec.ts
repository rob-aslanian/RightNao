import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCreateImageComponent } from './ads-create-image.component';

describe('AdsCreateImageComponent', () => {
  let component: AdsCreateImageComponent;
  let fixture: ComponentFixture<AdsCreateImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCreateImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCreateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
