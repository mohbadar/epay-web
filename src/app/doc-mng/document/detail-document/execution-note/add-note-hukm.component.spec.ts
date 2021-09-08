import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteHukmComponent } from './add-note-hukm.component';

describe('AddNoteHukmComponent', () => {
  let component: AddNoteHukmComponent;
  let fixture: ComponentFixture<AddNoteHukmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteHukmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteHukmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
