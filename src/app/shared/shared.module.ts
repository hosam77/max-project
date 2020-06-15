import {NgModule} from '@angular/core';
import {AlertComponent} from './alert/alert.component';
import {LoadinSpinerComponent} from './loadin-spiner/loadin-spiner.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {DropdownDirectiveDirective} from './dropdown-directive.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadinSpinerComponent,
    PlaceholderDirective,
    DropdownDirectiveDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AlertComponent,
    LoadinSpinerComponent,
    PlaceholderDirective,
    DropdownDirectiveDirective,
    CommonModule,
  ],
    entryComponents: [
    AlertComponent,
  ]
})
export  class SharedModule {
}
