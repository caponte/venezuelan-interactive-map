import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StateModalComponent } from './state-modal/state-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { BottomComponent } from './bottom-component/bottom-component.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailsComponent } from './details-component/details-component.component';
@NgModule({
  declarations: [
    AppComponent,
    StateModalComponent,
    HeaderComponent,
    BottomComponent,
    DetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
