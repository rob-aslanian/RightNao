import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenVOfficeComponent } from './open-v-office.component';

describe('OpenVOfficeComponent', () => {
  let component: OpenVOfficeComponent;
  let fixture: ComponentFixture<OpenVOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenVOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenVOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
