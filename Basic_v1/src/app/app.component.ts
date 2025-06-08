import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionItemComponent } from './option-item/option-item.component';
import { Title } from '@angular/platform-browser';
import { OptionsService } from './services/options.service';
import { GeneralOptionModel } from './models/general-option.model';
import { OptionGroupsEnum } from './models/option-groups.enum';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		OptionItemComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	providers: [OptionsService]
})
export class AppComponent implements OnInit {
	title = 'CYOA Basic v1';
	private genders: GeneralOptionModel[];

	constructor(private titleService: Title, private optionServ: OptionsService) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit() {
		this.genders = this.optionServ.GetOptions(OptionGroupsEnum.Gender);
	}
}
