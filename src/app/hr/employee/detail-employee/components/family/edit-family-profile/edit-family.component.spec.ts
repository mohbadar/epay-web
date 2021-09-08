import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditFamilyComponent} from './edit-family.component';

describe('EditFamilyComponent', () => {
  let component: EditFamilyComponent;
  let fixture: ComponentFixture<EditFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
