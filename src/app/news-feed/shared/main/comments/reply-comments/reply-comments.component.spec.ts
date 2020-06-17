import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentsComponent } from './reply-comments.component';

describe('ReplyCommentsComponent', () => {
  let component: ReplyCommentsComponent;
  let fixture: ComponentFixture<ReplyCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
