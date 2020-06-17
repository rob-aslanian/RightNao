import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFinishComponent } from './start-finish.component';

describe('StartFinishComponent', () => {
  let component: StartFinishComponent;
  let fixture: ComponentFixture<StartFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
