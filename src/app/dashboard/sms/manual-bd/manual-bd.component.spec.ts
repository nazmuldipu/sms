import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBdComponent } from './manual-bd.component';

describe('ManualBdComponent', () => {
  let component: ManualBdComponent;
  let fixture: ComponentFixture<ManualBdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualBdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
