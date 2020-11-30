import { AbstractControl } from "@angular/forms";

export function isNumberValidator(
  control: AbstractControl
): { [key: string]: any } {
  if ( control.value === null ){
    return null;
  } else {
    const valid = /^(\s*|\d+)$/.test(control.value);
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } };
  }
}