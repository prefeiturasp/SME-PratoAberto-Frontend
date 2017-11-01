import { KeysPipe } from './school/keys.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiMapModule} from '@ngui/map';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { OwlModule } from 'ng2-owl-carousel';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { SearchPipe } from './search/search.filter';
import { WindowRef } from './WindowRef';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SchoolComponent } from './school/school.component';

import { SchoolsService } from './schools.service';
import { CalendaryService } from './calendary.service';

import { routing } from './app.routing';
import { FocusDirective } from './focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    SchoolComponent,
    DatepickerComponent,
    SearchPipe,
    KeysPipe,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NguiAutoCompleteModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyD8QD7mRNzYD_QtUKnY39qKBLbJVxr4l5w'}),
    NguiDatetimePickerModule,
    OwlModule
  ],
  providers: [
    CalendaryService,
    SchoolsService,
    WindowRef
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
