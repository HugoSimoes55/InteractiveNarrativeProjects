import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionItemComponent } from './option-item/option-item.component';
import { Title } from '@angular/platform-browser';
import { OptionsService } from './services/options.service';
import { CommonModule } from '@angular/common';
import { OptionGroupComponent } from './option-group/option-group.component';
import { GeneralOptionGroupModel } from './models/general-option-group.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		OptionItemComponent,
		OptionGroupComponent,
		CommonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	providers: [OptionsService]
})
export class AppComponent implements OnInit {
	title = 'CYOA Basic v1';
	optionGroups: GeneralOptionGroupModel[] = [];

	constructor(private titleService: Title,
		private optionServ: OptionsService) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit() {
		this.optionServ.Options.subscribe((data) => {
			this.optionGroups = data;
		});
	}
}
