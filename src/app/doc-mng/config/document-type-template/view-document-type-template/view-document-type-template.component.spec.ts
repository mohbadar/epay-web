import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentTypeTemplateComponent } from './view-document-type-template.component';

describe('ViewDocumentTypeTemplateComponent', () => {
  let component: ViewDocumentTypeTemplateComponent;
  let fixture: ComponentFixture<ViewDocumentTypeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocumentTypeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
