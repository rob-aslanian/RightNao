import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VOfficeOrdersComponent } from './v-office-orders.component';

describe('VOfficeOrdersComponent', () => {
  let component: VOfficeOrdersComponent;
  let fixture: ComponentFixture<VOfficeOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VOfficeOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VOfficeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
