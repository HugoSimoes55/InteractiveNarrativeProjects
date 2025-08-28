import { Injectable } from '@angular/core';
import jsonData from './../../data/options.json';
import { OptionGroupModel } from '../models/option-group.model';
import { BehaviorSubject } from 'rxjs';
import { OptionItemModel } from '../models/option-item.model';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private AllOptions: OptionGroupModel[] = [];

	public OptionsEvent: BehaviorSubject<OptionGroupModel[]> = null;

	constructor() {
		this.AllOptions = Object.assign(new Array<OptionGroupModel>, jsonData);

		this.OptionsEvent = new BehaviorSubject<OptionGroupModel[]>(this.AllOptions);

		this.ValidateRequirements();
	}

	SelectOption(optionSelect: OptionItemModel) {
		let groupSelect = this.FindGroupByOptionId(optionSelect.ID);

		if (groupSelect.OptionItems.filter((option) => option.Selected).length < groupSelect.SelectionLimit
			|| groupSelect.OptionItems.filter((option) => option.Selected && option.ID == optionSelect.ID).length == 1) {
			groupSelect.OptionItems.find((option) => option.ID == optionSelect.ID).Selected = !optionSelect.Selected;

			this.AllOptions.find((group) => group.ID == groupSelect.ID)[0] = groupSelect;

			this.ValidateRequirements();
		}
	}

	FindOptionById(optionId: string): OptionItemModel {
		let groupId = optionId.substring(0, optionId.lastIndexOf("-"));

		return this.AllOptions.find((group) => group.ID == groupId)?.OptionItems.find((option) => option.ID == optionId);
	}

	FindGroupById(groupId: string): OptionGroupModel {
		return this.AllOptions.find((group) => group.ID == groupId);
	}

	FindGroupByOptionId(optionId: string): OptionGroupModel {
		let groupId = optionId.substring(0, optionId.lastIndexOf("-"));

		return this.AllOptions.find((group) => group.ID == groupId);
	}


	/////////////////////////
	///// Requirements
	/////////////////////////


	ValidateRequirements() {
		this.AllOptions.forEach((group) => {
			group = this.ValidateGroup(group);
		});

		this.OptionsEvent.next(this.AllOptions);
	}

	ValidateGroup(group: OptionGroupModel) {
		let ret: boolean = true;

		group.Requirements?.forEach((req) => {
			let option = this.FindOptionById(req.OptionID);

			if (option.Selected != req.SelectionState) {
				ret = false;
			}
		});

		group.RequirementVisibility = ret;

		return group;
	}
}
