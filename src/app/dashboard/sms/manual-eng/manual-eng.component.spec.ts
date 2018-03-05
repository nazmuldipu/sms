import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEngComponent } from './manual-eng.component';

describe('ManualEngComponent', () => {
  let component: ManualEngComponent;
  let fixture: ComponentFixture<ManualEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
