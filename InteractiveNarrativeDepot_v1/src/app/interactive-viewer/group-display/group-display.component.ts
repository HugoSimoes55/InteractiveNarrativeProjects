import { Component, Input, OnInit } from '@angular/core';
import { GroupItemInterface, OptionItemInterface } from '../../interfaces/option.interface';
import { CYOAViewerService } from '../../services/cyoa-viewer.service';

@Component({
	selector: 'app-group-display',
	templateUrl: './group-display.component.html',
	styleUrl: './group-display.component.css'
})
export class GroupDisplayComponent implements OnInit {

	@Input("Group") group: GroupItemInterface;

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {

	}

	// GetHTMLText(text: string) {
	// 	let dom = new DOMParser().parseFromString('<p>' + text + '</p>', 'text/html');

	// 	return dom;
	// }

	OnSelectionClick(option: OptionItemInterface) {
		if (option.IsEnabled) {
			this.cyoaServ.SelectOption(option);
		}
	}
}
