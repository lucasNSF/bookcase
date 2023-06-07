import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appChangePasswordVisibility]',
})
export class ChangePasswordVisibilityDirective {
  @Input() inputRef: HTMLInputElement | undefined;
  private visible = false;

  @HostListener('click')
  onClick(): void {
    if (!this.inputRef) {
      throw new Error('inputRef is not defined in the directive!');
    }

    if (this.visible) {
      this.inputRef.type = 'text';
      this.visible = false;
    } else {
      this.inputRef.type = 'password';
      this.visible = true;
    }
  }
}
