import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRecommendationsComponent } from './user-profile-recommendations.component';

describe('UserProfileRecommendationsComponent', () => {
  let component: UserProfileRecommendationsComponent;
  let fixture: ComponentFixture<UserProfileRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
