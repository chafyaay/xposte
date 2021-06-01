import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontalComponent } from './frontal.component';

describe('FrontalComponent', () => {
  let component: FrontalComponent;
  let fixture: ComponentFixture<FrontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
