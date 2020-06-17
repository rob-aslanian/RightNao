import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarMusicComponent } from './progress-bar-music.component';

describe('ProgressBarMusicComponent', () => {
  let component: ProgressBarMusicComponent;
  let fixture: ComponentFixture<ProgressBarMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
