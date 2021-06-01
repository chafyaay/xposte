import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormulaireComponent } from './template-formulaire.component';

describe('TemplateFormulaireComponent', () => {
  let component: TemplateFormulaireComponent;
  let fixture: ComponentFixture<TemplateFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormulaireComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
