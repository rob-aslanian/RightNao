import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VOfficeComponent } from './v-office.component';

describe('VOfficeComponent', () => {
  let component: VOfficeComponent;
  let fixture: ComponentFixture<VOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
