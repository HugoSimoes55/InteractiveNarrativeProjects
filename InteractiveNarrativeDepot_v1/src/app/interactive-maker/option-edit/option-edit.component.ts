import { Component, Input } from '@angular/core';
import { OptionGroupInterface } from '../../interfaces/option-group.interface';
import { CYOAMakerService } from '../../services/cyoa-maker.service';

@Component({
	selector: 'app-option-edit',
	templateUrl: './option-edit.component.html',
	styleUrl: './option-edit.component.css'
})
export class OptionEditComponent {

	@Input("Group") optionGroup: OptionGroupInterface;

	constructor(private cyoaServ: CYOAMakerService) {

	}

	ngOnInit() {
		if (this.optionGroup) {
			if (!this.optionGroup.SelectionLimit) {
				this.optionGroup.SelectionLimit = 0;
			}
		}
	}

	NewOption() {
		this.cyoaServ.AddOption(this.optionGroup);
	}
}
