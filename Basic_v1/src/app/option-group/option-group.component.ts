import { Component, Input } from '@angular/core';
import { GeneralOptionItemModel } from '../models/general-option.model';
import { OptionItemComponent } from '../option-item/option-item.component';
import { CommonModule } from '@angular/common';
import { GeneralOptionGroupModel } from '../models/general-option-group.model';

@Component({
	selector: 'app-option-group',
	standalone: true,
	imports: [OptionItemComponent,
		CommonModule
	],
	templateUrl: './option-group.component.html',
	styleUrl: './option-group.component.css'
})
export class OptionGroupComponent {

	@Input("OptionGroup") optionGroup: GeneralOptionGroupModel;
	@Input("OptionItems") optionItems: GeneralOptionItemModel[] = [];

	constructor() {

	}
}
