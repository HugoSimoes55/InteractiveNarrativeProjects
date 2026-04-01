import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InteractiveViewerComponent } from './interactive-viewer/interactive-viewer.component';
import { GroupDisplayComponent } from './interactive-viewer/group-display/group-display.component';
import { InteractiveMakerComponent } from './interactive-maker/interactive-maker.component';
import { GroupEditComponent } from './interactive-maker/group-edit/group-edit.component';
import { FormsModule } from '@angular/forms';
import { ItemTraitsComponent } from './interactive-maker/item-traits/item-traits.component';
import { ConsoleLoggerService } from './services/console-logger.service';
import { LoggerService } from './services/logger.service';
import { OptionEditComponent } from './interactive-maker/group-edit/option-edit/option-edit.component';

@NgModule({
	declarations: [
		AppComponent,
		InteractiveViewerComponent,
		GroupDisplayComponent,
		InteractiveMakerComponent,
		GroupEditComponent,
		ItemTraitsComponent,
  OptionEditComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
