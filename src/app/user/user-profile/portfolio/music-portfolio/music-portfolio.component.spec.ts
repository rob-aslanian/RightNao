import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPortfolioComponent } from './music-portfolio.component';

describe('MusicPortfolioComponent', () => {
  let component: MusicPortfolioComponent;
  let fixture: ComponentFixture<MusicPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
