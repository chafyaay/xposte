import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactiverEnMassComponent } from './desactiver-en-mass.component';

describe('DesactiverEnMassComponent', () => {
  let component: DesactiverEnMassComponent;
  let fixture: ComponentFixture<DesactiverEnMassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DesactiverEnMassComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactiverEnMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
