import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentEngComponent } from './absent-eng.component';

describe('AbsentEngComponent', () => {
  let component: AbsentEngComponent;
  let fixture: ComponentFixture<AbsentEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
