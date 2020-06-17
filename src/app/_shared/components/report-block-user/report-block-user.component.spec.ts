import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBlockUserComponent } from './report-block-user.component';

describe('ReportBlockUserComponent', () => {
  let component: ReportBlockUserComponent;
  let fixture: ComponentFixture<ReportBlockUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBlockUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBlockUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
