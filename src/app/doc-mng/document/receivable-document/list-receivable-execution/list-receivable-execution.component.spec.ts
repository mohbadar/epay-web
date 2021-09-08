import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivableExecutionComponent } from './list-receivable-execution.component';

describe('ListReceivableExecutionComponent', () => {
  let component: ListReceivableExecutionComponent;
  let fixture: ComponentFixture<ListReceivableExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReceivableExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivableExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
