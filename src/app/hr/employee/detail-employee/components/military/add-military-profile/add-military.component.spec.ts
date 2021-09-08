import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddMilitaryComponent} from './add-military.component';

describe('AddMilitaryComponent', () => {
  let component: AddMilitaryComponent;
  let fixture: ComponentFixture<AddMilitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMilitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
