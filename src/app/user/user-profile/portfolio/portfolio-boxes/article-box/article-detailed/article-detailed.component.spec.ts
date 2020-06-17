import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailedComponent } from './article-detailed.component';

describe('ArticleDetailedComponent', () => {
  let component: ArticleDetailedComponent;
  let fixture: ComponentFixture<ArticleDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
