import { Injectable } from '@angular/core';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { OptionBaseInterface } from '../interfaces/option-base.interface';
import { BehaviorSubject } from 'rxjs';
import { OptionItemInterface } from '../interfaces/option-item.interface';
import { OptionSearchType } from '../Enums/option-search-type.enum';
import { TraitValidationInterface } from '../interfaces/trait-validation.interface';

@Injectable({
	providedIn: 'root'
})
export class CYOAViewerService {

	private ViewerGroups: OptionGroupInterface[] = [];

	public AllOptionsEvent: BehaviorSubject<OptionBaseInterface[]> = new BehaviorSubject(this.ViewerGroups);
	public VisibleOptionsEvent: BehaviorSubject<OptionBaseInterface[]> = new BehaviorSubject(this.ViewerGroups.filter(x => x.IsVisible));

	public AllTraits: string[] = null;
	private SelectedTraits: string[] = [];

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor() {

	}

	LoadJsonData(jsonText: string) {

		var jsonObj: Object[] = JSON.parse(jsonText);

		this.ViewerGroups = [];

		jsonObj.forEach((baseOption: OptionGroupInterface) => this.ViewerGroups.push(baseOption));

		this.GenerateIDs();

		this.ValidateRequirements();
	}

	UpdateSubjects() {
		this.AllOptionsEvent.next(this.ViewerGroups);
		this.VisibleOptionsEvent.next(this.ViewerGroups.filter(x => x.IsVisible));
	}

	SelectOption(optionItem: OptionItemInterface) {

		let selectedGroup: OptionGroupInterface = this.FindOption(optionItem.ID, OptionSearchType.GetOptionGroupByItemID);

		let selectCount: number = selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected).length;
		let deselection: boolean = selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected && option.ID == optionItem.ID).length == 1;

		if (selectCount < (selectedGroup.SelectionLimit || 999)
			|| deselection) {
			selectedGroup.OptionItems.find((option: OptionItemInterface) => option.ID == optionItem.ID).Selected = !optionItem.Selected;

			this.ViewerGroups.find((group) => group.ID == selectedGroup.ID)[0] = selectedGroup;

			this.ValidateRequirements();
		}
	}

	ResetSelections() {
		// ToDo
	}

	///////////////
	///// ID //////
	///////////////

	GenerateIDs() {
		let i1: number = 1;

		this.ViewerGroups.forEach((opGroup: OptionGroupInterface) => {
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
	}

	FindOption(optionID: string, optionSearch: OptionSearchType) {
		if (optionSearch == OptionSearchType.GetOptionGroupByItemID) {

			let groupID = optionID.substring(0, optionID.lastIndexOf("_"));

			return this.ViewerGroups.find((group) => group.ID == groupID) as OptionGroupInterface;
		}
	}

	///////////////////
	///// Traits //////
	///////////////////

	ValidateRequirements() {
		this.LoadSelectedTraits();

		this.ValidateEnabledOptions();

		this.ValidateVisibleOptions();

		this.GetAllTraits();

		this.UpdateSubjects();
	}

	GetAllTraits() {
		let traits: string[] = [];

		this.ViewerGroups.forEach((group) => {

			if (group.Traits) {
				traits.push(...group.Traits);
			}

			group.OptionItems.forEach((option) => {
				if (option.Traits) {
					traits.push(...option.Traits)
				}
			});
		});

		this.AllTraits = traits;
	}

	LoadSelectedTraits() {
		this.SelectedTraits = [];

		this.ViewerGroups.filter(group => group.OptionItems.length > 0).forEach(
			(group) => group.OptionItems.filter((item) => item.Selected && item.Traits?.length > 0).forEach(
				item => this.SelectedTraits = this.SelectedTraits.concat(item.Traits)));

		//console.log("These are the selected traits:");
		//console.log(this.SelectedTraits);
	}

	ValidateEnabledOptions() {
		this.ViewerGroups.forEach((group) => {
			let groupEnabled = true;

			// Add group validation code here

			group.IsEnabled = groupEnabled;

			group.OptionItems.forEach((item) => {
				if (!groupEnabled) {
					item.IsEnabled = false;
					return;
				}

				let itemEnabled = true;

				// Add item validation code here

				item.IsEnabled = itemEnabled;
			});
		});
	}

	ValidateVisibleOptions() {

		this.ViewerGroups.forEach((group) => {
			let groupVal: TraitValidationInterface = group.TraitsForVisible;
			let groupVisible: boolean = true;

			if (!groupVal) {
				group.IsVisible = true;
				return;
			}

			let matchCount: number = 0;

			groupVal.Traits.forEach((trait) => {
				if (this.SelectedTraits.includes(trait)) {
					matchCount++;
				};
			});

			switch (groupVal.MatchType) {
				case "Any":
					groupVisible = matchCount > 0;
					break;
				case "All":
					groupVisible = matchCount == groupVal.Traits.length;
					break;
			}

			if (groupVal.ValidationType != "Enable") {
				groupVisible = !groupVisible;
			}

			group.IsVisible = groupVisible;
		});
	}
	/////////////////
	///// Maker /////
	/////////////////

	AddGroup() {

		// let test: OptionGroupInterface = {} as OptionGroupInterface;

		// test.Title = "New Group";

		// this.MakerGroups.push(test);

		// this.UpdateSubjects();
	}


}
