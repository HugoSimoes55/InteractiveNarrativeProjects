import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseItemInterface, GroupItemInterface, OptionItemInterface } from '../interfaces/option.interface';
import { CYOAViewerService } from './cyoa-viewer.service';
import { LoggerService } from './logger.service';
import { ItemTypes } from '../Enums/misc.enum';
import { TraitValidationInterface } from '../interfaces/trait-validation.interface';

@Injectable({
	providedIn: 'root'
})
export class CYOAMakerService {

	private MakerGroups: GroupItemInterface[] = [];

	public AllItemsEvent: BehaviorSubject<BaseItemInterface[]> = new BehaviorSubject(this.MakerGroups);

	constructor(private viewerServ: CYOAViewerService,
		private logger: LoggerService) {

	}

	LoadJsonData(jsonText: string) {
		this.logger.Debug("Maker - LoadJsonData Started");

		var jsonObj: Object[] = JSON.parse(jsonText);

		this.MakerGroups = [];

		jsonObj.forEach((groupItem: GroupItemInterface) => this.MakerGroups.push(groupItem));

		this.InitializeGroupsAttributes();

		this.logger.Debug("Maker - Groups Loaded", this.MakerGroups);

		this.UpdateSubjects();
	}

	private InitializeGroupsAttributes() {
		this.logger.Debug("Maker - InitializeGroupsAttributes Started");

		this.MakerGroups.forEach((group: GroupItemInterface) => {

			group.ItemType = ItemTypes.Group;
			group.OptionItemsPerRow = (group.OptionItemsPerRow || 5);

			this.SetDefaultValidationTraits(group);

			group.OptionItems.forEach((option: OptionItemInterface) => {
				option.ItemType = ItemTypes.Option;

				this.SetDefaultValidationTraits(option);
			});
		});

		this.logger.Debug("Maker - Groups Updated", this.MakerGroups);
	}

	private GenerateIDs() {
		this.logger.Debug("Maker - GenerateIDs Started");

		let i1: number = 1;

		this.MakerGroups.forEach((opGroup: GroupItemInterface) => {
			opGroup.ID = i1.toString();

			if (opGroup.OptionItems.length > 0) {
				let i2: number = 1;

				opGroup.OptionItems.forEach((opItem: OptionItemInterface) => {
					opItem.ID = i1.toString() + "_" + i2.toString();

					i2++;
				});
			}

			i1++;
		});

		this.logger.Debug("Maker - Groups Updated", this.MakerGroups);
	}

	private UpdateSubjects() {
		this.GenerateIDs();

		this.AllItemsEvent.next(this.MakerGroups);

		this.Save();

		this.logger.Debug("Maker - Subscriptions Updated");
	}

	AddGroup() {
		this.logger.Debug("Maker - Adding New Group");

		let newGroup: GroupItemInterface = {} as GroupItemInterface;

		newGroup.Title = "New Group";
		newGroup.ItemType = "Group";

		this.MakerGroups.push(newGroup);

		this.UpdateSubjects();
	}

	AddOption(group: GroupItemInterface) {
		this.logger.Debug("Maker - Adding New Option to Group", group);

		let index = this.MakerGroups.indexOf(group);

		let newOption: OptionItemInterface = {} as OptionItemInterface;

		newOption.ItemType = "OptionItem";

		group.OptionItems.push(newOption);

		this.MakerGroups[index] = this.MakerGroups[index];

		this.UpdateSubjects();
	}

	Save() {
		this.logger.Debug("Maker - Saving Changes");

		this.viewerServ.UpdateViewerGroups(this.MakerGroups);
	}

	SetDefaultValidationTraits(item: BaseItemInterface) {
		item.TraitsForEnabled = item.TraitsForEnabled ?? {} as TraitValidationInterface;
		item.TraitsForNotEnabled = item.TraitsForNotEnabled ?? {} as TraitValidationInterface;
		item.TraitsForVisible = item.TraitsForVisible ?? {} as TraitValidationInterface;
		item.TraitsForNotVisible = item.TraitsForNotVisible ?? {} as TraitValidationInterface;
	}
}
