import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { OfficeOverviewComponent } from './office-overview.component';

describe('OfficeOverviewComponent', () => {
  let component: OfficeOverviewComponent;
  let fixture: ComponentFixture<OfficeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
