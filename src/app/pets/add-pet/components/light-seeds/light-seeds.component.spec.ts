import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSeedsComponent } from './light-seeds.component';

describe('LightSeedsComponent', () => {
  let component: LightSeedsComponent;
  let fixture: ComponentFixture<LightSeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightSeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
