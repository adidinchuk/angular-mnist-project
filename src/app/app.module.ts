import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DigitsComponent } from './components/digits/digits.component';
import { CanvasComponent } from './components/digits/canvas/canvas.component';
import { DigitControlComponent } from './components/digits/digit-control/digit-control.component';
import { PredictionComponent } from './components/digits/prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitsComponent,
    CanvasComponent,
    DigitControlComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
