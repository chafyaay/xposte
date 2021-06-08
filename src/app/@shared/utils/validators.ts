import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customIPListValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const regex = new RegExp(
      '^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])[.]){3}(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])$'
    );
    const inputValue = control.value ? control.value : ''; //  to not have this error  Cannot read property 'split' of null
    const ips: string[] = inputValue.split(',');
    let isIpValid = true;
    ips.forEach((ip) => {
      if (!regex.test(ip)) {
        isIpValid = false;
      }
    });
    return isIpValid ? null : { ipError: true };
  };
}

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const regex = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
    );
    let isEmailValid = true;
    if (!regex.test(control.value)) {
      isEmailValid = false;
    }

    return isEmailValid ? null : { emailError: true };
  };
}
