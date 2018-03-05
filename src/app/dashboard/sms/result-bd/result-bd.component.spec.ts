import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultBdComponent } from './result-bd.component';

describe('ResultBdComponent', () => {
  let component: ResultBdComponent;
  let fixture: ComponentFixture<ResultBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
