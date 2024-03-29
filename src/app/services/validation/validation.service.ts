import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { StorageError } from '@angular/fire/storage';
import { AbstractControl } from '@angular/forms';
import { FirebaseErrorCode } from 'src/app/models/enums/FirebaseErrorCode';
import { StorageErrorCode } from 'src/app/models/enums/StorageErrorCode';
import { ValidationStrategy } from 'src/app/models/interfaces/ValidationStrategy';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private enums: Record<string, unknown>[] = [
    FirebaseErrorCode,
    StorageErrorCode,
  ];
  private errorMap = new Map<string, unknown>();

  constructor() {
    this.enums.forEach(enumItem => {
      Object.keys(enumItem).forEach(key => {
        this.errorMap.set(
          key,
          (enumItem as unknown as Record<string, unknown>)[key]
        );
      });
    });
  }

  apply(control: AbstractControl, validation: ValidationStrategy): void {
    control.addValidators(validation.apply.bind(control));
  }

  handleFirebaseError(error: FirebaseError): string {
    const message = this.errorMap.get(error.code) as string;
    return message;
  }

  handleStorageError(error: StorageError): string {
    const message = this.errorMap.get(error.code) as string;
    return message;
  }
}
