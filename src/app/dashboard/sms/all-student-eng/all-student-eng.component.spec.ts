import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentEngComponent } from './all-student-eng.component';

describe('AllStudentEngComponent', () => {
  let component: AllStudentEngComponent;
  let fixture: ComponentFixture<AllStudentEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStudentEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
