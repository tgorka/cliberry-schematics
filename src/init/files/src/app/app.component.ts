import * as _debug from "debug";
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';


/**
 * Debug console. To enable it in the browser you need to set in the termilal: 'localstorage.debug="<%= utils.dasherize(name) %>:*"'
 */
const debug = _debug("<%= utils.dasherize(name) %>:debug:app");
debug.log = console.log.bind(console);
const info = _debug("<%= utils.dasherize(name) %>:info:app");
info.log = console.info.bind(console);
const error = _debug("<%= utils.dasherize(name) %>:error:app");
error.log = console.error.bind(console);

@Component({
  selector: '<%= utils.dasherize(name) %>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '<%= utils.dasherize(name) %>';
}
