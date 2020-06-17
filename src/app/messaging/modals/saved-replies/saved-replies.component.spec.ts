import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRepliesComponent } from './saved-replies.component';

describe('SavedRepliesComponent', () => {
  let component: SavedRepliesComponent;
  let fixture: ComponentFixture<SavedRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
