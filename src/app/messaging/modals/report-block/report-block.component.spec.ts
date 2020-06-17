import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBlockComponent } from './report-block.component';

describe('ReportBlockComponent', () => {
  let component: ReportBlockComponent;
  let fixture: ComponentFixture<ReportBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
