import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHeaderComponent } from './office-header.component';

describe('OfficeHeaderComponent', () => {
  let component: OfficeHeaderComponent;
  let fixture: ComponentFixture<OfficeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
