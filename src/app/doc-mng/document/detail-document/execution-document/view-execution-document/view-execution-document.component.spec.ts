import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExecutionDocumentComponent } from './view-execution-document.component';

describe('ViewExecutionDocumentComponent', () => {
  let component: ViewExecutionDocumentComponent;
  let fixture: ComponentFixture<ViewExecutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExecutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExecutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
