
import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export function CustomEmailValidator(control: AbstractControl) {
    if (!control.value) {
        return null;
    }
    
    return Validators.email(control);
  }