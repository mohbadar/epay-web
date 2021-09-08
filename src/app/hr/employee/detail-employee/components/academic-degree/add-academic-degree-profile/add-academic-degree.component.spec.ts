import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddAcademicDegreeComponent} from './add-academic-degree.component';

describe('AddAcademicDegreeComponent', () => {
  let component: AddAcademicDegreeComponent;
  let fixture: ComponentFixture<AddAcademicDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcademicDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
