import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkBoxWrapperComponent } from './network-box-wrapper.component';

describe('NetworkBoxWrapperComponent', () => {
  let component: NetworkBoxWrapperComponent;
  let fixture: ComponentFixture<NetworkBoxWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkBoxWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkBoxWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
