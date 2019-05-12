import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableSpreadsheetComponent } from './table-spreadsheet/table-spreadsheet.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSpreadsheetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
