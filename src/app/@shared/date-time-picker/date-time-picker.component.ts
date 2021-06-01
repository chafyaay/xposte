import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  AfterViewInit,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateTimeModel } from './date-time.model';
import { noop } from 'rxjs';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: [
    './date-time-picker.component.scss'
  ],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
    {provide: NgbDatepickerI18n, useClass: DateTimePickerComponent},

  ],
})
export class DateTimePickerComponent extends NgbDatepickerI18n
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input()
  dateString: string;

  @Input()
  inputDatetimeFormat = 'M/d/yyyy H:mm:ss';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 1;
  @Input()
  secondStep = 1;
  @Input()
  seconds = true;
  @Input()
  label: string;

  @Input()
  disabled = false;

  @Input()
  dateType: string;

  @Input()
  dateTimeString: string;

  @Output() datetimevalueEvent: EventEmitter<any> = new EventEmitter();

  public showTimePickerToggle = false;

  public datetime: DateTimeModel = new DateTimeModel();
  public firstTimeAssign = true;

  // @ViewChild(NgbDatepicker, { static: true })
  // public dp: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true })
  public popover: NgbPopover;

  public onTouched: () => void = noop;
  public onChange: (_: any) => void = noop;

  private ngControl: NgControl;

  constructor(private config: NgbPopoverConfig, private inj: Injector) {
    super()
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe(($event) => {
      this.showTimePickerToggle = false;
    });
  }

  getWeekdayShortName(weekday: number): string {
    switch(weekday){
      case 1: return 'Lu';
      case 2: return 'Ma';
      case 3: return 'Me';
      case 4: return 'Je';
      case 5: return 'Ve';
      case 6: return 'Sa';
      case 7: return 'Di';
    }
    };
  getMonthShortName(month: number): string {
     switch(month){
      case 1: return 'Janvier';
      case 2: return 'Féverier';
      case 3: return 'Mars';
      case 4: return 'Avril';
      case 5: return 'Mai';
      case 6: return 'Juin';
      case 7: return 'Juillet';
      case 8: return 'Août';
      case 9: return 'Septembre';
      case 10: return 'Octobre';
      case 11: return 'Novembre';
      case 12: return 'Décembre';
    }
  };
  getMonthFullName(month: number): string {return "Mois"};
  getDayAriaLabel(date: NgbDateStruct): string {return "e"};
  

  writeValue(newModel: string) {
    console.log(newModel);
    if (newModel) {
      this.datetime = Object.assign(
        this.datetime,
        DateTimeModel.fromLocalString(newModel)
      );
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);

    if (dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === '') {
      this.datetime = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.onChange(value);
    }
  }

  onDateChange($event: string | NgbDateStruct, dp: NgbDatepicker) {
    const date = new DateTimeModel($event);

    if (!date) {
      this.dateString = this.dateString;
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    const adjustedDate = new Date(this.datetime.toString());
    if (this.datetime.timeZoneOffset !== adjustedDate.getTimezoneOffset()) {
      this.datetime.timeZoneOffset = adjustedDate.getTimezoneOffset();
    }

    this.setDateStringModel();
    this.datetimevalueEvent.emit(this.datetime);
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
    this.datetimevalueEvent.emit(this.datetime);
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();

    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur($event) {
    this.onTouched();
  }
}
