import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiMapModule } from '@ngui/map';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { OwlModule } from 'ng2-owl-carousel';

import { DatepickerComponent } from './datepicker/datepicker.component';

import { AppComponent } from './app.component';
import { PAGES } from './pages';


import { routing } from './app.routing';
import { PIPES } from './pipes';
import { DIRECTIVE } from './directives';
import { SERVICES } from './services';

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES,
    ...PIPES,
    ...DIRECTIVE,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NguiAutoCompleteModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC8kj656eK7QoUEKd4aZe0NwlYl_vJSCnA' }),
    NguiDatetimePickerModule,
    OwlModule
  ],
  providers: [
    ...SERVICES
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
