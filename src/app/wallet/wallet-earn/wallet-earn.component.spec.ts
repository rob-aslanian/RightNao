import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletEarnComponent } from './wallet-earn.component';

describe('WalletEarnComponent', () => {
  let component: WalletEarnComponent;
  let fixture: ComponentFixture<WalletEarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletEarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
