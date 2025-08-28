import { Component, Input } from '@angular/core';
import { OptionItemModel } from '../models/option-item.model';
import { OptionItemComponent } from '../option-item/option-item.component';
import { CommonModule } from '@angular/common';
import { OptionGroupModel } from '../models/option-group.model';

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

	@Input("OptionGroup") optionGroup: OptionGroupModel;
	@Input("OptionItems") optionItems: OptionItemModel[] = [];

	constructor() {

	}
}
