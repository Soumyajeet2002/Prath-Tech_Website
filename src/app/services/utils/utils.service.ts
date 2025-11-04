import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public checkFormControlValidity(
    isSubmitBtnClicked: any,
    formGroup: { controls: { [x: string]: { dirty: any; invalid: any; }; }; },
    formControlName: string | number
  ) {
    if (
      (isSubmitBtnClicked && formGroup.controls[formControlName].invalid) || (formGroup.controls[formControlName].invalid && (formGroup.controls[formControlName].dirty))
    ) {
      return true;
    } else {
      return false;
    }
  }
}
