import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDark: BehaviorSubject<boolean> = new BehaviorSubject(true);

  getTheme(): Observable<boolean> {
    return this._isDark.asObservable();
  }

  set theme(condition: boolean) {
    this._isDark.next(condition);
  }
}
