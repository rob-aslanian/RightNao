import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangsModalComponent } from './langs-modal.component';

describe('LangsModalComponent', () => {
  let component: LangsModalComponent;
  let fixture: ComponentFixture<LangsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
