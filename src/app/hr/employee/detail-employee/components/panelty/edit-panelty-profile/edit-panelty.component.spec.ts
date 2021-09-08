import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EditPaneltyComponent} from './edit-panelty.component';

describe('EditPaneltyComponent', () => {
  let component: EditPaneltyComponent;
  let fixture: ComponentFixture<EditPaneltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaneltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaneltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
