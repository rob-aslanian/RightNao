import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeContainerComponent } from './office-container.component';

describe('OfficeContainerComponent', () => {
  let component: OfficeContainerComponent;
  let fixture: ComponentFixture<OfficeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
