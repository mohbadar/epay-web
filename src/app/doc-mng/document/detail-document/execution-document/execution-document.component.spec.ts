import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionDocumentComponent } from './execution-document.component';

describe('ExecutionDocumentComponent', () => {
  let component: ExecutionDocumentComponent;
  let fixture: ComponentFixture<ExecutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
