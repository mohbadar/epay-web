import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessVehicleScheduleComponent } from './process-vehicle-schedule.component';

describe('ProcessVehicleScheduleComponent', () => {
  let component: ProcessVehicleScheduleComponent;
  let fixture: ComponentFixture<ProcessVehicleScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessVehicleScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessVehicleScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
