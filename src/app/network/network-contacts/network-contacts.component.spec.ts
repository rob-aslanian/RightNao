import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkContactsComponent } from './network-contacts.component';

describe('NetworkContactsComponent', () => {
  let component: NetworkContactsComponent;
  let fixture: ComponentFixture<NetworkContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
