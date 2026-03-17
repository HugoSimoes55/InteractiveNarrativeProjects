import { Component, Input } from '@angular/core';
import { CYOAMakerService } from '../../services/cyoa-maker.service';
import { OptionGroupInterface } from '../../interfaces/option.interface';

@Component({
	selector: 'app-option-edit',
	templateUrl: './option-edit.component.html',
	styleUrl: './option-edit.component.css'
})
export class OptionEditComponent {

	@Input("Group") optionGroup: OptionGroupInterface;

	expanded: boolean = false;

	constructor(private cyoaServ: CYOAMakerService) {

	}

	ngOnInit() {
		if (this.optionGroup) {
			if (!this.optionGroup.SelectionLimit) {
				this.optionGroup.SelectionLimit = 0;
			}
		}
	}

	expandGroup() {
		this.expanded = !this.expanded;
	}

	NewOption() {
		this.cyoaServ.AddOption(this.optionGroup);
	}
}
