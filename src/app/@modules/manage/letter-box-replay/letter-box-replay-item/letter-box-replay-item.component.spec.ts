import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxReplayItemComponent } from './letter-box-replay-item.component';

describe('LetterBoxReplayItemComponent', () => {
  let component: LetterBoxReplayItemComponent;
  let fixture: ComponentFixture<LetterBoxReplayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterBoxReplayItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxReplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
