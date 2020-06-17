import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomplishmentModalComponent } from './accomplishment-modal.component';

describe('AccomplishmentModalComponent', () => {
  let component: AccomplishmentModalComponent;
  let fixture: ComponentFixture<AccomplishmentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplishmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomplishmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
