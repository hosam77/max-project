import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirectiveDirective {

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$evan']) toggleOpen(){
    this.isOpen = !this.isOpen ;
  }
}
