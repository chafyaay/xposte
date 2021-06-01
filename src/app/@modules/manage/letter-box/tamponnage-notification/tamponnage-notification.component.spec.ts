import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamponnageNotificationComponent } from './tamponnage-notification.component';

describe('TamponnageNotificationComponent', () => {
  let component: TamponnageNotificationComponent;
  let fixture: ComponentFixture<TamponnageNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TamponnageNotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamponnageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
