import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditMedicalComponent} from './edit-medical.component';

describe('EditMedicalComponent', () => {
  let component: EditMedicalComponent;
  let fixture: ComponentFixture<EditMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
