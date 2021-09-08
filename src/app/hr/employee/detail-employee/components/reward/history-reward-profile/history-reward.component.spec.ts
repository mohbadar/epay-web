import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRewardComponent } from './history-reward.component';

describe('HistoryRewardComponent', () => {
  let component: HistoryRewardComponent;
  let fixture: ComponentFixture<HistoryRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
