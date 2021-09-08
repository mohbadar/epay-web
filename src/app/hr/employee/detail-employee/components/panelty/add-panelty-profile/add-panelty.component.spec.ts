import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddPaneltyComponent} from './add-panelty.component';

describe('AddPaneltyComponent', () => {
  let component: AddPaneltyComponent;
  let fixture: ComponentFixture<AddPaneltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaneltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaneltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
