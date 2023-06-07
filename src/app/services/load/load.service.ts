import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DeterminateLoadBarComponent } from 'src/app/components/determinate-load-bar/determinate-load-bar.component';
import { LoadBarComponent } from 'src/app/components/load-bar/load-bar.component';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  addDeterminateLoadBar(
    viewContainerRef: ViewContainerRef
  ): ComponentRef<DeterminateLoadBarComponent> {
    return viewContainerRef.createComponent(DeterminateLoadBarComponent);
  }

  addLoadBar(viewContainerRef: ViewContainerRef): void {
    viewContainerRef.createComponent(LoadBarComponent);
  }

  closeLoadBar(viewContainerRef: ViewContainerRef): void {
    viewContainerRef.clear();
  }
}
