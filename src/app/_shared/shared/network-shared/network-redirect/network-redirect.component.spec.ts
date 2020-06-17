import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkRedirectComponent } from './network-redirect.component';

describe('NetworkRedirectComponent', () => {
  let component: NetworkRedirectComponent;
  let fixture: ComponentFixture<NetworkRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
