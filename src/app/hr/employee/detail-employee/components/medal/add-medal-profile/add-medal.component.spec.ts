import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddMedalComponent} from './add-medal.component';

describe('AddMedalComponent', () => {
  let component: AddMedalComponent;
  let fixture: ComponentFixture<AddMedalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
