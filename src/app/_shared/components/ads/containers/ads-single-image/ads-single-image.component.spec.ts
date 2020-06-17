import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSingleImageComponent } from './ads-single-image.component';

describe('AdsSingleImageComponent', () => {
  let component: AdsSingleImageComponent;
  let fixture: ComponentFixture<AdsSingleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsSingleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsSingleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
