import { Component, Input, OnInit } from '@angular/core';
import { OptionGroupInterface, OptionItemInterface } from '../../interfaces/option.interface';
import { CYOAViewerService } from '../../services/cyoa-viewer.service';

@Component({
	selector: 'app-option-display',
	templateUrl: './option-display.component.html',
	styleUrl: './option-display.component.css'
})
export class OptionDisplayComponent implements OnInit {

	@Input("Group") optionGroup: OptionGroupInterface;

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {

	}

	// GetHTMLText(text: string) {
	// 	let dom = new DOMParser().parseFromString('<p>' + text + '</p>', 'text/html');

	// 	return dom;
	// }

	OnSelectionClick(optionItem: OptionItemInterface) {
		if (optionItem.IsEnabled) {
			this.cyoaServ.SelectOption(optionItem);
		}
	}
}
