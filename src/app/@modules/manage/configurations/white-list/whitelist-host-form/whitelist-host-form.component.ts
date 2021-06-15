import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BAL } from '@shared/models/BAL';
import { WhiteListHost } from '@shared/models/WhiteListHost';

@Component({
  selector: 'app-whitelist-host-form',
  templateUrl: './whitelist-host-form.component.html',
  styleUrls: ['./whitelist-host-form.component.scss'],
})
export class WhitelistHostFormComponent implements OnInit {
  @Output()
  valideCreateHost: EventEmitter<WhiteListHost> = new EventEmitter<WhiteListHost>();
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  createHostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createHostForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      typeListe: ['liste_avant', [Validators.required]],
      domainIp: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  customIPValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const regex = new RegExp(
        '^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])[.]){3}(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])$'
      );
      const inputValue = control.value ? control.value : ''; // because  we  can have a null value

      return regex.test(inputValue) && inputValue !== ''
        ? null
        : { ipError: true };
    };
  }

  closeFormulaire() {
    window.scrollTo(0, 0); //  to scroll to the top of the page
    this.closeEvent.emit(false);
  }

  createHost() {
    let newHost: WhiteListHost;
    newHost = this.createHostForm.value;

    if (this.createHostForm.valid) {
      window.scrollTo(0, 0); //  to scroll to the top of the page
      this.valideCreateHost.emit(newHost);
    }
  }
}
