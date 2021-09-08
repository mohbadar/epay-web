import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVisitorComponent } from './schedule-visitor.component';

describe('ScheduleVisitorComponent', () => {
  let component: ScheduleVisitorComponent;
  let fixture: ComponentFixture<ScheduleVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
