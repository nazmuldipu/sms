import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentBdComponent } from './all-student-bd.component';

describe('AllStudentBdComponent', () => {
  let component: AllStudentBdComponent;
  let fixture: ComponentFixture<AllStudentBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStudentBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
