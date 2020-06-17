 

import { UserportfoliodetailedComponent } from './userportfoliodetailed.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('UserportfoliodetailedComponent', () => {
  let component: UserportfoliodetailedComponent;
  let fixture: ComponentFixture<UserportfoliodetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserportfoliodetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserportfoliodetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
