import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditAcademicDegreeComponent} from './edit-academic-degree.component';

describe('EditAcademicDegreeComponent', () => {
  let component: EditAcademicDegreeComponent;
  let fixture: ComponentFixture<EditAcademicDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAcademicDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcademicDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
