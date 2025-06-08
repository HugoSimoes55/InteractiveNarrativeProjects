import { Component, Input, OnInit } from '@angular/core';
import { GeneralOptionModel } from '../models/general-option.model';

@Component({
	selector: 'app-option-item',
	standalone: true,
	imports: [],
	templateUrl: './option-item.component.html',
	styleUrl: './option-item.component.css'
})
export class OptionItemComponent implements OnInit {
	@Input("Option") option: GeneralOptionModel;

	constructor() {

	}

	ngOnInit(): void {

	}
}
