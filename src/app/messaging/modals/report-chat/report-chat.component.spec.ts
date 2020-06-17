import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChatComponent } from './report-chat.component';

describe('ReportChatComponent', () => {
  let component: ReportChatComponent;
  let fixture: ComponentFixture<ReportChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
