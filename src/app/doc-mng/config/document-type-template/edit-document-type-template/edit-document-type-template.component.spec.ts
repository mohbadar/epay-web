import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentTypeTemplateComponent } from './edit-document-type-template.component';

describe('EditDocumentTypeTemplateComponent', () => {
  let component: EditDocumentTypeTemplateComponent;
  let fixture: ComponentFixture<EditDocumentTypeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentTypeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
