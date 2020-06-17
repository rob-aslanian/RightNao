
import { EstateFormComponent } from './estate-form.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('EstateFormComponent', () => {
  let component: EstateFormComponent;
  let fixture: ComponentFixture<EstateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
