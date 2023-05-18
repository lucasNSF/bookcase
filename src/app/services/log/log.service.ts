import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { LogInfoComponent } from 'src/app/components/log-info/log-info.component';
import { LogData } from 'src/app/models/interfaces/LogData';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logConfig: {
    duration: number;
    horizontalPosition: MatSnackBarHorizontalPosition;
  } = {
    duration: 1500,
    horizontalPosition: 'start',
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccessLog(message: string): void {
    const logData: LogData = { message, logType: 'success' };
    this.snackBar.openFromComponent(LogInfoComponent, {
      data: logData,
      panelClass: ['success-snackbar'],
      ...this.logConfig,
    });
  }

  showErrorLog(message: string): void {
    const logData: LogData = { message, logType: 'error' };
    this.snackBar.openFromComponent(LogInfoComponent, {
      data: logData,
      panelClass: ['error-snackbar'],
      ...this.logConfig,
    });
  }

  closeLog(): void {
    this.snackBar.dismiss();
  }
}
