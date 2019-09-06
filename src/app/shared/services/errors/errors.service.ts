import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Error } from '../../models/errors.model';
import { HttpErrorResponse } from '@angular/common/http';
import { progressAnimationEnum, typeNotification } from '../../models/notification.model';
import { throwError } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  public getError(controlName: string, formGroup: FormGroup, errorIntf?: Array<Error>, isSubmit: boolean = false): string {
    let error = null;
    const control = formGroup.get(controlName);
    for (const item in control.errors) {
      if (isSubmit && control.errors != null) {
        if (item === 'customMessage') {
          error = control.errors[item];
        } else {
          error = this.getValidatorErrorMessage(item, control.errors[item], errorIntf);
        }
      } else {
        if ((control.dirty || control.touched) && control.errors != null) {
          // error = JSON.stringify(control.errors);
          if (item === 'customMessage') {
            error = control.errors[item];
          } else {
            error = this.getValidatorErrorMessage(item, control.errors[item], errorIntf);
          }
        }
      }
    }
    return error;
  }

  private getValidatorErrorMessage(validatorNamw: string, validatorValue?: any, errorIntf?: Array<Error>) {
    const erroList: Array<any> = [];
    if (errorIntf) {
      errorIntf.forEach(fe => {
        if (validatorNamw === fe.errorType) {
          erroList[fe.errorType] = fe.message;
        }
      });
    }
    // const config = {
    //   required: 'El campo es requerido',
    //   minlength: `Caracteres mínimos ${validatorValue.requiredLength}`,
    //   maxlength: `Caracteres máximos ${validatorValue.requiredLength}`
    // };
    return erroList[validatorNamw];
  }

  errorHandl(error: HttpErrorResponse, currentDoom: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    currentDoom.notify.showToastr(errorMessage, 'Error', {
      type: typeNotification.error,
      progressBar: true,
      progressAnimation: progressAnimationEnum.increasing,
      closeBtn: true,
      tapToDismiss: true
    });
    return throwError(errorMessage);
  }
}
