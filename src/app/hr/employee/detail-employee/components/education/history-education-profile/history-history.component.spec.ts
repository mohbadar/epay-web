import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEducationComponent } from './history-history.component';

describe('HistoryEducationComponent', () => {
  let component: HistoryEducationComponent;
  let fixture: ComponentFixture<HistoryEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
