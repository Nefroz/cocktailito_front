import { AbstractControl } from "@angular/forms";

export function isFloatValidator(
  control: AbstractControl
): { [key: string]: any } {
  if ( control.value === null ){
    return null;
  } else {
    const valid = /[+-]?([0-9]*[.])?[0-9]+/.test(control.value);
    return valid
      ? null
      : { invalidFloat: { valid: false, value: control.value } };
  }
}