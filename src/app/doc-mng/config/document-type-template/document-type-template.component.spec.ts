import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeTemplateComponent } from './document-type-template.component';

describe('DocumentTypeTemplateComponent', () => {
  let component: DocumentTypeTemplateComponent;
  let fixture: ComponentFixture<DocumentTypeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
