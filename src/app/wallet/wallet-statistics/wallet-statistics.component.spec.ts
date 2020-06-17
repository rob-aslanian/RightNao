import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStatisticsComponent } from './wallet-statistics.component';

describe('WalletStatisticsComponent', () => {
  let component: WalletStatisticsComponent;
  let fixture: ComponentFixture<WalletStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
