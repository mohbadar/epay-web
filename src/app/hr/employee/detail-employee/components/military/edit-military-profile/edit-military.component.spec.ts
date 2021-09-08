import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditMilitaryComponent} from './edit-military.component';

describe('EditMilitaryComponent', () => {
  let component: EditMilitaryComponent;
  let fixture: ComponentFixture<EditMilitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMilitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
