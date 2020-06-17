import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvilabilityHomeComponent } from './avilability-home.component';

describe('AvilabilityHomeComponent', () => {
  let component: AvilabilityHomeComponent;
  let fixture: ComponentFixture<AvilabilityHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvilabilityHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvilabilityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
