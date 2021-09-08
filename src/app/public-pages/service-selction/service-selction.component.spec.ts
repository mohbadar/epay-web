import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSelctionComponent } from './service-selction.component';

describe('ServiceSelctionComponent', () => {
  let component: ServiceSelctionComponent;
  let fixture: ComponentFixture<ServiceSelctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSelctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSelctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
