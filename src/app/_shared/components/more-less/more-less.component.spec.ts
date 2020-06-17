import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLessComponent } from './more-less.component';

describe('MoreLessComponent', () => {
  let component: MoreLessComponent;
  let fixture: ComponentFixture<MoreLessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreLessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
