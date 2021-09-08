import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateDocumentComponent } from './evaluate-document.component';

describe('EvaluateDocumentComponent', () => {
  let component: EvaluateDocumentComponent;
  let fixture: ComponentFixture<EvaluateDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
