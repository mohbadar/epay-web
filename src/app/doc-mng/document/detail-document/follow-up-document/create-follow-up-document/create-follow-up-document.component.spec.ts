import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFollowUpComponent } from './create-follow-up.component';

describe('CreateFollowUpComponent', () => {
  let component: CreateFollowUpComponent;
  let fixture: ComponentFixture<CreateFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
