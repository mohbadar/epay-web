import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentExecutionTypeComponent } from './create-document-execution-type.component';

describe('CreateDocumentExecutionTypeComponent', () => {
  let component: CreateDocumentExecutionTypeComponent;
  let fixture: ComponentFixture<CreateDocumentExecutionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumentExecutionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentExecutionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
