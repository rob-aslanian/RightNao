import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkManageComponent } from './network-manage.component';

describe('NetworkManageComponent', () => {
  let component: NetworkManageComponent;
  let fixture: ComponentFixture<NetworkManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
