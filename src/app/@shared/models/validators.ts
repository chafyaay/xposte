import { FormControl } from "@angular/forms";
import * as moment from "moment";

export function DateValidator(format = "DD/MM/YYYY"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
  
      if (!val.isValid()) {
        return { invalidDate: true };
      }
  
      return null;
    };
  }
  
  export const PeriodValidator = (fc: FormControl) => {
    const isValid = fc.value;
    return isValid
      ? null
      : {
        isValid: {
          valid: false,
        },
      };
  };
  
  
  export const ListIsNotEmpty = (fc: FormControl) => {
    const isValid = fc.value;
    return isValid
      ? null
      : {
        isValid: {
          valid: false,
        },
      };
  };