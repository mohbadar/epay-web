import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentExecutionTypeComponent } from './edit-document-execution-type.component';

describe('EditDocumentExecutionTypeComponent', () => {
  let component: EditDocumentExecutionTypeComponent;
  let fixture: ComponentFixture<EditDocumentExecutionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentExecutionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentExecutionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
