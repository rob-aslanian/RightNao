import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBoxComponent } from './article-box.component';

describe('ArticleBoxComponent', () => {
  let component: ArticleBoxComponent;
  let fixture: ComponentFixture<ArticleBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
