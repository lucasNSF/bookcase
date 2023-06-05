import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule],
})
export class ThemeSwitchComponent implements OnInit, OnDestroy {
  isDark!: boolean;
  private subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.subscription = this.themeService
      .getTheme()
      .subscribe(theme => (this.isDark = theme));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDarkTheme(): void {
    if (this.isDark) {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.themeService.theme = false;
      this.isDark = false;
    } else {
      this.renderer.addClass(document.body, 'dark-theme');
      this.themeService.theme = true;
      this.isDark = true;
    }
  }
}
