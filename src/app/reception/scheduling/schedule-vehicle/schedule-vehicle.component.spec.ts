import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVehicleComponent } from './schedule-vehicle.component';

describe('ScheduleVehicleComponent', () => {
  let component: ScheduleVehicleComponent;
  let fixture: ComponentFixture<ScheduleVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
