import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAndLinkComponent } from './media-and-link.component';

describe('MediaAndLinkComponent', () => {
  let component: MediaAndLinkComponent;
  let fixture: ComponentFixture<MediaAndLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaAndLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAndLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
