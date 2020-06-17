import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkImportComponent } from './network-import.component';

describe('NetworkImportComponent', () => {
  let component: NetworkImportComponent;
  let fixture: ComponentFixture<NetworkImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
