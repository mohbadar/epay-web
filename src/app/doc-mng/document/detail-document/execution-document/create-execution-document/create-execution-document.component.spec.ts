import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExecutionDocumentComponent } from './create-execution-document.component';

describe('CreateExecutionDocumentComponent', () => {
  let component: CreateExecutionDocumentComponent;
  let fixture: ComponentFixture<CreateExecutionDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExecutionDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExecutionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
