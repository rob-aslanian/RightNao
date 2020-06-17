import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPortfolioDetailedComponent } from './music-portfolio-detailed.component';

describe('MusicPortfolioDetailedComponent', () => {
  let component: MusicPortfolioDetailedComponent;
  let fixture: ComponentFixture<MusicPortfolioDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPortfolioDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPortfolioDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
