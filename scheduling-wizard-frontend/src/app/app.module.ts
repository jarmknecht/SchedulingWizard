import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatDialogModule, MatProgressSpinnerModule, MatAutocompleteModule, MatChipsModule, MatListModule, MatExpansionModule, MatSlideToggleModule, MatTableModule } from '@angular/material';
import { HelpComponent } from './help/help.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StartComponent } from './start/start.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { MiniWeekComponent } from './mini-week/mini-week.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomEventDialogComponent } from './custom-event-dialog/custom-event-dialog.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { LargeWeekComponent } from './large-week/large-week.component';
import { ClassTableComponent } from './class-table/class-table.component';

@NgModule({
  entryComponents: [
    LoaderComponent,
    CustomEventDialogComponent,
    ViewScheduleComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ToolbarComponent,
    StartComponent,
    LoaderComponent,
    MiniWeekComponent,
    CustomEventDialogComponent,
    ViewScheduleComponent,
    LargeWeekComponent,
    ClassTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
