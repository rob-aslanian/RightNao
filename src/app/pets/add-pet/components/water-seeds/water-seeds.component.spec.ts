import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSeedsComponent } from './water-seeds.component';

describe('WaterSeedsComponent', () => {
  let component: WaterSeedsComponent;
  let fixture: ComponentFixture<WaterSeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterSeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
