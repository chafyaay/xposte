import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemponnageComponent } from './temponnage.component';

describe('TemponnageComponent', () => {
  let component: TemponnageComponent;
  let fixture: ComponentFixture<TemponnageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemponnageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemponnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
