import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentExecutionTypeComponent } from './view-document-execution-type.component';

describe('ViewDocumentExecutionTypeComponent', () => {
  let component: ViewDocumentExecutionTypeComponent;
  let fixture: ComponentFixture<ViewDocumentExecutionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocumentExecutionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentExecutionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
