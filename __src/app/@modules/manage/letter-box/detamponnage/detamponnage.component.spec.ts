import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetamponnageComponent } from './detamponnage.component';

describe('DetamponnageComponent', () => {
  let component: DetamponnageComponent;
  let fixture: ComponentFixture<DetamponnageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetamponnageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetamponnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
