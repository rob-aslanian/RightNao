import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandscapeUsedComponent } from './landscape-used.component';

describe('LandscapeUsedComponent', () => {
  let component: LandscapeUsedComponent;
  let fixture: ComponentFixture<LandscapeUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandscapeUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandscapeUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
