import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCommentsComponent } from './portfolio-comments.component';

describe('PortfolioCommentsComponent', () => {
  let component: PortfolioCommentsComponent;
  let fixture: ComponentFixture<PortfolioCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
