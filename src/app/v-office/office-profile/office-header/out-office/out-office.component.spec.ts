import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfficeComponent } from './out-office.component';

describe('OutOfficeComponent', () => {
  let component: OutOfficeComponent;
  let fixture: ComponentFixture<OutOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
