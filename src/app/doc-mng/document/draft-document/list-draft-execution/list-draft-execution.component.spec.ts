import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDraftExecutionComponent } from './list-draft-execution.component';

describe('ListDraftExecutionComponent', () => {
  let component: ListDraftExecutionComponent;
  let fixture: ComponentFixture<ListDraftExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDraftExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDraftExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
