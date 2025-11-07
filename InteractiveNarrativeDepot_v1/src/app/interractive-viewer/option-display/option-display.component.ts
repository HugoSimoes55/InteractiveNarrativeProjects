import { Component, Input, OnInit } from '@angular/core';
import { OptionBaseInterface } from '../../interfaces/option-base.interface';
import { OptionGroupInterface } from '../../interfaces/option-group.interface';
import { OptionItemInterface } from '../../interfaces/option-item.interface';
import { OptionsService } from '../../services/options.service';

@Component({
	selector: 'app-option-display',
	templateUrl: './option-display.component.html',
	styleUrl: './option-display.component.css'
})
export class OptionDisplayComponent implements OnInit {

	@Input("Option") optionGroup: OptionGroupInterface;

	constructor(private optionServ: OptionsService) {

	}

	ngOnInit() {
		
	}

	GetHTMLText(text: string) {
		let dom = new DOMParser().parseFromString('<p>' + text + '</p>', 'text/html');

		return dom;
	}

	OnSelectionClick(optionItem:OptionItemInterface) {
		this.optionServ.SelectOption(optionItem);
	}
}
