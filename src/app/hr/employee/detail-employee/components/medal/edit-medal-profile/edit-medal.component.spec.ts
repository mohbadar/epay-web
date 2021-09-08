import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditMedalComponent} from './edit-medal.component';

describe('EditMedalComponent', () => {
  let component: EditMedalComponent;
  let fixture: ComponentFixture<EditMedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
