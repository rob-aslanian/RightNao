import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedMainComponent } from './news-feed-main.component';

describe('NewsFeedMainComponent', () => {
  let component: NewsFeedMainComponent;
  let fixture: ComponentFixture<NewsFeedMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
