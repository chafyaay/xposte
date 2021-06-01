import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxReplayListComponent } from './letter-box-replay-list.component';

describe('LetterBoxReplayListComponent', () => {
  let component: LetterBoxReplayListComponent;
  let fixture: ComponentFixture<LetterBoxReplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterBoxReplayListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxReplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
