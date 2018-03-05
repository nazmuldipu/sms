import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasswiseBdComponent } from './classwise-bd.component';

describe('ClasswiseBdComponent', () => {
  let component: ClasswiseBdComponent;
  let fixture: ComponentFixture<ClasswiseBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasswiseBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasswiseBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
