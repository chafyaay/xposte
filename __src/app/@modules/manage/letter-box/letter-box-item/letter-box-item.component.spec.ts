import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterBoxItemComponent } from './letter-box-item.component';

describe('LetterBoxItemComponent', () => {
  let component: LetterBoxItemComponent;
  let fixture: ComponentFixture<LetterBoxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterBoxItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
