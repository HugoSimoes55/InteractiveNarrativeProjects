import { Injectable, OnInit } from '@angular/core';
import { GeneralOptionItemModel } from '../models/general-option.model';
import jsonData from './../../data/options.json';
import { GeneralOptionGroupModel } from '../models/general-option-group.model';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private allOptions: Map<string, GeneralOptionItemModel[]> = new Map<string, GeneralOptionItemModel[]>();;

	constructor() {

	}

	LoadData() {

		let data = Object.assign(new Array<GeneralOptionGroupModel>, jsonData);

		console.log(data);

		return data;
	}
}
