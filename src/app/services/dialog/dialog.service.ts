import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openModal(
    message: string,
    callback: () => void
  ): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      data: { message, callback },
    });
  }
}
