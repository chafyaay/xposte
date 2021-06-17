import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontalDeleteComponent } from './frontal-delete.component';

describe('FrontalDeleteComponent', () => {
  let component: FrontalDeleteComponent;
  let fixture: ComponentFixture<FrontalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontalDeleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
