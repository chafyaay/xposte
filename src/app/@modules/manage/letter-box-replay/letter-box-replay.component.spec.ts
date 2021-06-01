import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxReplayComponent } from './letter-box-replay.component';

describe('LetterBoxReplayComponent', () => {
  let component: LetterBoxReplayComponent;
  let fixture: ComponentFixture<LetterBoxReplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterBoxReplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
