import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeProposallBoxComponent } from './office-proposall-box.component';

describe('OfficeProposallBoxComponent', () => {
  let component: OfficeProposallBoxComponent;
  let fixture: ComponentFixture<OfficeProposallBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeProposallBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeProposallBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
