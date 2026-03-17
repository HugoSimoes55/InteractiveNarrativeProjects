import { Component, Input, OnInit } from '@angular/core';
import { CYOAMakerService } from '../../../services/cyoa-maker.service';
import { OptionGroupInterface, OptionItemInterface } from '../../../interfaces/option.interface';

@Component({
	selector: 'app-option-traits',
	templateUrl: './option-traits.component.html',
	styleUrl: './option-traits.component.css'
})
export class OptionTraitsComponent implements OnInit {

	@Input("OptionGroup") optionGroup: OptionGroupInterface;
	@Input("OptionItem") optionItem: OptionItemInterface;

	isGroup: boolean = false;
	isItem: boolean = false;

	constructor(private cyoaServ: CYOAMakerService) {

	}

	ngOnInit() {
		this.isGroup = this.optionGroup != null;
		this.isItem = this.optionItem != null;
	}
}
