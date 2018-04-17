import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export function AmountValidation(control: AbstractControl) {
    return  isNaN(control.value) ? {'amount': {value: control.value}} : null;
  }