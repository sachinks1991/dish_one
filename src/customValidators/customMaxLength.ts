import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export function MaxLengthValidator(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let inputValue : string = control.value as string;
      let inputLength : number = inputValue.length;
      return inputLength > value ? {'maxLength': {value: control.value}} : null;
    };
  }