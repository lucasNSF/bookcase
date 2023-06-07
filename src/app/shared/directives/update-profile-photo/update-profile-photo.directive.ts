import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appUpdateProfilePhoto]',
})
export class UpdateProfilePhotoDirective implements OnChanges {
  @Input() pathImage: string | undefined = undefined;
  @Input() isDark: boolean | undefined = undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    if (this.isDark === undefined) {
      throw new Error("Input variable 'isDark' must be initialized!");
    }

    if (!this.pathImage) {
      const defaultImage = this.isDark
        ? 'assets/images/profile-dark.png'
        : 'assets/images/profile.png';
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'src',
        defaultImage
      );
    } else {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'src',
        this.pathImage
      );
    }
  }
}
