import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatModalComponent } from './repeat-modal.component';

describe('RepeatModalComponent', () => {
  let component: RepeatModalComponent;
  let fixture: ComponentFixture<RepeatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
