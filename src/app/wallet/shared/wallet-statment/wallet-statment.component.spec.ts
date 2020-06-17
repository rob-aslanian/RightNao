import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStatmentComponent } from './wallet-statment.component';

describe('WalletStatmentComponent', () => {
  let component: WalletStatmentComponent;
  let fixture: ComponentFixture<WalletStatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletStatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletStatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
