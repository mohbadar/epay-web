import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleSubformComponent } from './create-vehicle-subform.component';

describe('CreateVehicleSubformComponent', () => {
  let component: CreateVehicleSubformComponent;
  let fixture: ComponentFixture<CreateVehicleSubformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVehicleSubformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleSubformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
