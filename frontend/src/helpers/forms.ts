import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }

      const error = {};
      error[controlName + 'MustMatch'] = true;

      if (control.value !== matchingControl.value) {
          matchingControl.setErrors(error);
      } else {
          matchingControl.setErrors(null);
      }
  };
}
