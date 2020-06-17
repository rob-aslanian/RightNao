import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowersSeasonComponent } from './flowers-season.component';

describe('FlowersSeasonComponent', () => {
  let component: FlowersSeasonComponent;
  let fixture: ComponentFixture<FlowersSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowersSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowersSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
