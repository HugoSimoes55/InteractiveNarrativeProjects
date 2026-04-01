import { Component, Input } from '@angular/core';
import { OptionItemInterface } from '../../../interfaces/option.interface';

@Component({
	selector: 'app-option-edit',
	templateUrl: './option-edit.component.html',
	styleUrl: './option-edit.component.css'
})
export class OptionEditComponent {

	@Input("Option") option: OptionItemInterface;

	constructor() {

	}
}
