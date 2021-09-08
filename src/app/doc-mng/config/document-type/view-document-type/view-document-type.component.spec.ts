import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentTypeComponent } from './view-document-type.component';

describe('ViewDocumentTypeComponent', () => {
  let component: ViewDocumentTypeComponent;
  let fixture: ComponentFixture<ViewDocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
