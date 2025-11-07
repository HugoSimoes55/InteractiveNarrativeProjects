import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InterractiveViewerComponent } from './interractive-viewer/interractive-viewer.component';
import { OptionDisplayComponent } from './interractive-viewer/option-display/option-display.component';

@NgModule({
	declarations: [
		AppComponent,
		InterractiveViewerComponent,
  OptionDisplayComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
