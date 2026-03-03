import { Injectable } from '@angular/core';
import { OptionGroupInterface } from '../interfaces/option-group.interface';

@Injectable({
	providedIn: 'root'
})
export class CYOAMakerService {

	private MakerGroups: OptionGroupInterface[] = [];

	constructor() {

	}

	LoadJsonData(jsonText: string) {

		var jsonObj: Object[] = JSON.parse(jsonText);

		this.MakerGroups = [];

		jsonObj.forEach((baseOption: OptionGroupInterface) => this.MakerGroups.push(baseOption));
	}
}
