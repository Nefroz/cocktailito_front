import { AbstractControl } from "@angular/forms";

export function isLessThanSixCharactersValidator(
  control: AbstractControl
): { [key: string]: any } {
  if ( control.value === null ){
    return null;
  } else {
    const valid = /^[0-9]{0,5}$/.test(control.value);
    return valid
      ? null
      : { invalidLessThanSixCharacters: { valid: false, value: control.value } };
  }
}