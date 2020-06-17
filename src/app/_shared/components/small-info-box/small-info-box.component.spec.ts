import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallInfoBoxComponent } from './small-info-box.component';

describe('SmallInfoBoxComponent', () => {
  let component: SmallInfoBoxComponent;
  let fixture: ComponentFixture<SmallInfoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallInfoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
