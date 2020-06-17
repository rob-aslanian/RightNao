import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNetworkComponent } from './demo-network.component';

describe('DemoNetworkComponent', () => {
  let component: DemoNetworkComponent;
  let fixture: ComponentFixture<DemoNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
