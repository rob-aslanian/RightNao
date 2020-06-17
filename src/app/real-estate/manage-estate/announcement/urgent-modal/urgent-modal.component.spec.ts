import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentModalComponent } from './urgent-modal.component';

describe('UrgentModalComponent', () => {
  let component: UrgentModalComponent;
  let fixture: ComponentFixture<UrgentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrgentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrgentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
