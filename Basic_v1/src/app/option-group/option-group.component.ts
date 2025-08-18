import { Component, Input } from '@angular/core';
import { GeneralOptionItemModel } from '../models/general-option.model';
import { OptionItemComponent } from '../option-item/option-item.component';
import { CommonModule } from '@angular/common';

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

	@Input("groupTitle") groupTitle: string;
	@Input("GroupItems") GroupItems: GeneralOptionItemModel[] = [];

	constructor() {

	}
}
