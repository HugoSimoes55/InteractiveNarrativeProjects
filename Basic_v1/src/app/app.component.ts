import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionItemComponent } from './option-item/option-item.component';
import { Title } from '@angular/platform-browser';
import { OptionsService } from './services/options.service';
import { CommonModule } from '@angular/common';
import { OptionGroupComponent } from './option-group/option-group.component';
import { OptionGroupModel } from './models/option-group.model';

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
	optionGroups: OptionGroupModel[] = [];

	get activeGroups() {
		console.log(this.optionGroups);

		return this.optionGroups.filter((group) => group.RequirementVisibility);
	}

	constructor(private titleService: Title,
		private optionServ: OptionsService) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit() {
		this.optionServ.OptionsEvent.subscribe((data) => {
			this.optionGroups = data;
		});
	}
}
