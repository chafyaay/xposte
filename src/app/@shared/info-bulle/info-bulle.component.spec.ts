import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBulleComponent } from './info-bulle.component';

describe('InfoBulleComponent', () => {
  let component: InfoBulleComponent;
  let fixture: ComponentFixture<InfoBulleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBulleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
