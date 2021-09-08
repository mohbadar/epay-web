import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentTypeTemplateComponent } from './create-document-type-template.component';

describe('CreateDocumentTypeTemplateComponent', () => {
  let component: CreateDocumentTypeTemplateComponent;
  let fixture: ComponentFixture<CreateDocumentTypeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumentTypeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
