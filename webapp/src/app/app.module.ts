import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, DialogConnectMetamask, DialogProfile } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    DialogConnectMetamask,
    DialogProfile
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogConnectMetamask,
    DialogProfile
  ]
})
export class AppModule { }
