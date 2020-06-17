import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModalComponent } from './reaction-modal.component';

describe('ReactionModalComponent', () => {
  let component: ReactionModalComponent;
  let fixture: ComponentFixture<ReactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
