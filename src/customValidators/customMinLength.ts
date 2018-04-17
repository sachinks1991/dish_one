import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export function MinLengthValidator(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let inputValue : string = control.value as string;
      let inputLength : number = inputValue.length;
      return inputLength < value ? {'minLength': {value: control.value}} : null;
    };
  }