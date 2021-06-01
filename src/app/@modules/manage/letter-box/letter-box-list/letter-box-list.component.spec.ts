import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxListComponent } from './letter-box-list.component';

describe('LetterBoxListComponent', () => {
  let component: LetterBoxListComponent;
  let fixture: ComponentFixture<LetterBoxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterBoxListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
