import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsContentComponent } from './reactions-content.component';

describe('ReactionsContentComponent', () => {
  let component: ReactionsContentComponent;
  let fixture: ComponentFixture<ReactionsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
