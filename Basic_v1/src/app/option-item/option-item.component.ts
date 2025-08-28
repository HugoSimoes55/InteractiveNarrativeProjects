import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OptionItemModel } from '../models/option-item.model';
import { CommonModule } from '@angular/common';
import { OptionsService } from '../services/options.service';

@Component({
	selector: 'app-option-item',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './option-item.component.html',
	styleUrl: './option-item.component.css'
})
export class OptionItemComponent implements OnInit {
	@Input("Option") option: OptionItemModel;

	//OptionSelected: boolean = false;

	constructor(private optionsServ: OptionsService) {

	}

	ngOnInit(): void {

	}

	onSelectOption() {
		//this.OptionSelected = !this.OptionSelected;

		this.optionsServ.SelectOption(this.option);
	}
}
