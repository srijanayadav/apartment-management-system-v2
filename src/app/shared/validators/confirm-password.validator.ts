import { AbstractControl, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
export function ConfirmPasswordValidator(matchingControlName: string): ValidatorFn {
    return (control: AbstractControl) => {
        console.log(control);

        if (!control || !control.parent) {
            return null;
        }
        return (control.parent as FormGroup).get(matchingControlName)?.value === control.value ? null : { mismatch: true };
    };
  }