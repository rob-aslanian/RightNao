import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountsChangeComponent } from './wallet-accounts-change.component';

describe('WalletAccountsChangeComponent', () => {
  let component: WalletAccountsChangeComponent;
  let fixture: ComponentFixture<WalletAccountsChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAccountsChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAccountsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
