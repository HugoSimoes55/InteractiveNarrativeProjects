import { Injectable, OnInit } from '@angular/core';
import { GeneralOptionItemModel } from '../models/general-option.model';
import { OptionGroupsEnum } from '../models/option-groups.enum';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private allOptions: Map<string, GeneralOptionItemModel[]> = new Map<string, GeneralOptionItemModel[]>();;

	constructor() {

	}

	GetOptions(optionGroup: OptionGroupsEnum) {

		return this.allOptions.get(optionGroup);
	}

	SetOption(optionGroup: OptionGroupsEnum, options: GeneralOptionItemModel[]) {
		this.allOptions.set(optionGroup, options);
	}
}
