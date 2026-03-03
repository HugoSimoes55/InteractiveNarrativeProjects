import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InteractiveViewerComponent } from './interactive-viewer/interactive-viewer.component';
import { OptionDisplayComponent } from './interactive-viewer/option-display/option-display.component';
import { InteractiveMakerComponent } from './interactive-maker/interactive-maker.component';
import { OptionEditComponent } from './interactive-maker/option-edit/option-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		InteractiveViewerComponent,
		OptionDisplayComponent,
		InteractiveMakerComponent,
		OptionEditComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
