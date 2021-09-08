import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessVisitorScheduleComponent } from './process-visitor-schedule.component';

describe('ProcessVisitorScheduleComponent', () => {
  let component: ProcessVisitorScheduleComponent;
  let fixture: ComponentFixture<ProcessVisitorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessVisitorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessVisitorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
