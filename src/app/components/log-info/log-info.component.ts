import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { LogData } from 'src/app/models/interfaces/LogData';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-log-info',
  templateUrl: './log-info.component.html',
  styleUrls: ['./log-info.component.scss'],
})
export class LogInfoComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: LogData,
    private logService: LogService
  ) {}

  closeLog(): void {
    this.logService.closeLog();
  }
}
