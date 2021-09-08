import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExecutionDocumentComponent } from './edit-execution-document.component';

describe('EditExecutionDocumentComponent', () => {
  let component: EditExecutionDocumentComponent;
  let fixture: ComponentFixture<EditExecutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExecutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExecutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
