import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasswiseEngComponent } from './classwise-eng.component';

describe('ClasswiseEngComponent', () => {
  let component: ClasswiseEngComponent;
  let fixture: ComponentFixture<ClasswiseEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasswiseEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasswiseEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
