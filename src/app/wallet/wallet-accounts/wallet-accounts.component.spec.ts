import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountsComponent } from './wallet-accounts.component';

describe('WalletAccountsComponent', () => {
  let component: WalletAccountsComponent;
  let fixture: ComponentFixture<WalletAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
