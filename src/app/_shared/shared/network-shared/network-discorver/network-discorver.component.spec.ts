import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDiscorverComponent } from './network-discorver.component';

describe('NetworkDiscorverComponent', () => {
  let component: NetworkDiscorverComponent;
  let fixture: ComponentFixture<NetworkDiscorverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkDiscorverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDiscorverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
