import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEngComponent } from './result-eng.component';

describe('ResultEngComponent', () => {
  let component: ResultEngComponent;
  let fixture: ComponentFixture<ResultEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
