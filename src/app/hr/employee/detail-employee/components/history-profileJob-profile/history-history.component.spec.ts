import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProfileJobComponent } from './history-profilejob.component';

describe('HistoryProfileJobComponent', () => {
  let component: HistoryProfileJobComponent;
  let fixture: ComponentFixture<HistoryProfileJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryProfileJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryProfileJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
