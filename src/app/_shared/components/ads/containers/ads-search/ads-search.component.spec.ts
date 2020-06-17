import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSearchComponent } from './ads-search.component';

describe('AdsSearchComponent', () => {
  let component: AdsSearchComponent;
  let fixture: ComponentFixture<AdsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
