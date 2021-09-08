import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTrainingComponent } from './history-training.component';

describe('HistoryTrainingComponent', () => {
  let component: HistoryTrainingComponent;
  let fixture: ComponentFixture<HistoryTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
