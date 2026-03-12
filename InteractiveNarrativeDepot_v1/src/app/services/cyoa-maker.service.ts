import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionBaseInterface } from '../interfaces/option-base.interface';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { CYOAViewerService } from './cyoa-viewer.service';
import { OptionItemInterface } from '../interfaces/option-item.interface';

@Injectable({
	providedIn: 'root'
})
export class CYOAMakerService {

	private MakerGroups: OptionGroupInterface[] = [];

	public AllOptionsEvent: BehaviorSubject<OptionBaseInterface[]> = new BehaviorSubject(this.MakerGroups);

	constructor(private viewerServ: CYOAViewerService) {

	}

	LoadJsonData(jsonText: string) {

		var jsonObj: Object[] = JSON.parse(jsonText);

		this.MakerGroups = [];

		jsonObj.forEach((baseOption: OptionGroupInterface) => this.MakerGroups.push(baseOption));

		this.UpdateSubjects();
	}

	private UpdateSubjects() {
		this.AllOptionsEvent.next(this.MakerGroups);
	}

	AddGroup() {

		let newGroup: OptionGroupInterface = {} as OptionGroupInterface;

		newGroup.Title = "New Group";

		this.MakerGroups.push(newGroup);

		this.UpdateSubjects();
	}

	AddOption(group: OptionGroupInterface) {
		let index = this.MakerGroups.indexOf(group);

		group.OptionItems.push({} as OptionItemInterface);

		this.MakerGroups[index] = this.MakerGroups[index];

		this.UpdateSubjects();
	}

	Save() {
		console.log(this.MakerGroups);

		this.viewerServ.UpdateViewerGroups(this.MakerGroups);
	}
}
