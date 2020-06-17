import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCounterComponent } from './wallet-counter.component';

describe('WalletCounterComponent', () => {
  let component: WalletCounterComponent;
  let fixture: ComponentFixture<WalletCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
