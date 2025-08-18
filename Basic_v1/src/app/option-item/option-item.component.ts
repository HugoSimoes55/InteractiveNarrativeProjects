import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GeneralOptionItemModel } from '../models/general-option.model';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-option-item',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './option-item.component.html',
	styleUrl: './option-item.component.css'
})
export class OptionItemComponent implements OnInit {
	//@ViewChild("optionRoot") root: ElementRef;
	@Input("Option") option: GeneralOptionItemModel;

	OptionSelected: boolean = false;

	constructor() {

	}

	ngOnInit(): void {

	}

	onSelectOption() {
		this.OptionSelected = !this.OptionSelected;
	}
}
