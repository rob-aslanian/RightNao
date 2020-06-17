import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLangsComponent } from './profile-langs.component';

describe('ProfileLangsComponent', () => {
  let component: ProfileLangsComponent;
  let fixture: ComponentFixture<ProfileLangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLangsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
