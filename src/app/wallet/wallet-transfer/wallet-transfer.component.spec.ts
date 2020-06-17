import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransferComponent } from './wallet-transfer.component';

describe('WalletTransferComponent', () => {
  let component: WalletTransferComponent;
  let fixture: ComponentFixture<WalletTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
