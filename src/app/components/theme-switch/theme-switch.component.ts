import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent {
  isDark = true;

  constructor(private renderer: Renderer2) {}

  toggleDarkTheme(): void {
    if (this.isDark) {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.isDark = false;
    } else {
      this.renderer.addClass(document.body, 'dark-theme');
      this.isDark = true;
    }
  }
}
