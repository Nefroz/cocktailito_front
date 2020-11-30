import { AbstractControl } from "@angular/forms";

export function isCharacterOrAccentValidator(
  control: AbstractControl
): { [key: string]: any }{
  if ( control.value === null ){
    return null;
  } else {
    const valid = /^(\s*|[A-zÀ-ÖØ-öø-ÿ-])+$/ .test(control.value);
    return valid
      ? null
      : { invalidCharacterOrAccent: { valid: false, value: control.value } };
  }
}