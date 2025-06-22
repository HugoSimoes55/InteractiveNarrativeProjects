import { Injectable, OnInit } from '@angular/core';
import { GeneralOptionModel } from '../models/general-option.model';
import { OptionGroupsEnum } from '../models/option-groups.enum';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private allOptions: Map<string, GeneralOptionModel[]> = new Map<string, GeneralOptionModel[]>();;

	constructor() {

	}

	GetOptions(optionGroup: OptionGroupsEnum) {

		return this.allOptions.get(optionGroup);
	}

	SetOption(optionGroup: OptionGroupsEnum, options: GeneralOptionModel[]) {
		this.allOptions.set(optionGroup, options);
	}
}
