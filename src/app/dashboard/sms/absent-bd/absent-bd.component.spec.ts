import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentBdComponent } from './absent-bd.component';

describe('AbsentBdComponent', () => {
  let component: AbsentBdComponent;
  let fixture: ComponentFixture<AbsentBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
