
import { DealTypeComponent } from './deal-type.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('DealTypeComponent', () => {
  let component: DealTypeComponent;
  let fixture: ComponentFixture<DealTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
