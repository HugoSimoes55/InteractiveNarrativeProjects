import { Injectable } from '@angular/core';
import jsonData from './../../data/options.json';
import { GeneralOptionGroupModel } from '../models/general-option-group.model';
import { BehaviorSubject } from 'rxjs';
import { GeneralOptionItemModel } from '../models/general-option.model';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private AllOptions: GeneralOptionGroupModel[] = [];

	public Options: BehaviorSubject<GeneralOptionGroupModel[]> = null;

	constructor() {
		this.AllOptions = Object.assign(new Array<GeneralOptionGroupModel>, jsonData);

		this.Options = new BehaviorSubject<GeneralOptionGroupModel[]>(this.AllOptions);
	}

	SelectOption(optionSelect: GeneralOptionItemModel) {
		let groupSelect = this.FindGroupByOptionId(optionSelect.ID);

		if (groupSelect.OptionItems.filter((option) => option.Selected).length < groupSelect.SelectionLimit
			|| groupSelect.OptionItems.filter((option) => option.Selected && option.ID == optionSelect.ID).length == 1) {
			groupSelect.OptionItems.find((option) => option.ID == optionSelect.ID).Selected = !optionSelect.Selected;

			this.AllOptions.find((group) => group.ID == groupSelect.ID)[0] = groupSelect;
		}

		this.Options.next(this.AllOptions);
	}

	FindGroupByOptionId(optionId: string): GeneralOptionGroupModel {
		let groupId = optionId.substring(0, optionId.lastIndexOf("-"));

		return this.AllOptions.find((group) => group.ID == groupId);
	}
}
