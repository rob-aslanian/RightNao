import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAreaComponent } from './total-area.component';

describe('TotalAreaComponent', () => {
  let component: TotalAreaComponent;
  let fixture: ComponentFixture<TotalAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
