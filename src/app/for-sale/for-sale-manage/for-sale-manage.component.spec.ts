import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleManageComponent } from './for-sale-manage.component';

describe('ForSaleManageComponent', () => {
  let component: ForSaleManageComponent;
  let fixture: ComponentFixture<ForSaleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSaleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
