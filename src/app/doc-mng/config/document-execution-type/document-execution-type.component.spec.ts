import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExecutionTypeComponent } from './document-execution-type.component';

describe('DocumentExecutionTypeComponent', () => {
  let component: DocumentExecutionTypeComponent;
  let fixture: ComponentFixture<DocumentExecutionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentExecutionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentExecutionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
