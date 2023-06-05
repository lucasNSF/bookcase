import { Injectable, ViewContainerRef } from '@angular/core';
import { LoadBarComponent } from 'src/app/components/load-bar/load-bar.component';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  addLoadBar(viewContainerRef: ViewContainerRef): void {
    viewContainerRef.createComponent(LoadBarComponent);
  }

  closeLoadBar(viewContainerRef: ViewContainerRef): void {
    viewContainerRef.clear();
  }
}
