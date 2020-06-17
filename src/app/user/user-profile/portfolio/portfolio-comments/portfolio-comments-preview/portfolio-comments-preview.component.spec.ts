import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCommentsPreviewComponent } from './portfolio-comments-preview.component';

describe('PortfolioCommentsPreviewComponent', () => {
  let component: PortfolioCommentsPreviewComponent;
  let fixture: ComponentFixture<PortfolioCommentsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCommentsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCommentsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
