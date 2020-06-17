
import { AddEstateComponent } from './add-estate.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('AddEstateComponent', () => {
  let component: AddEstateComponent;
  let fixture: ComponentFixture<AddEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
