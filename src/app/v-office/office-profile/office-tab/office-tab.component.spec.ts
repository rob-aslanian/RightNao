import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeTabComponent } from './office-tab.component';

describe('OfficeTabComponent', () => {
  let component: OfficeTabComponent;
  let fixture: ComponentFixture<OfficeTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
