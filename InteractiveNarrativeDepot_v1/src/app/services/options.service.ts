import { Injectable } from '@angular/core';
import { OptionBaseInterface } from '../interfaces/option-base.interface';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { OptionItemInterface } from '../interfaces/option-item.interface';
import { BehaviorSubject } from 'rxjs';
import { OptionSearchType } from '../Enums/option-search-type.enum';
import { TraitValidationInterface } from '../interfaces/trait-validation.interface';

@Injectable({
	providedIn: 'root'
})
export class OptionsService {

	private LoadedOptions: OptionGroupInterface[] = [];

	private SelectedTraits: string[] = [];

	public OptionsEvent: BehaviorSubject<OptionBaseInterface[]> = new BehaviorSubject(this.LoadedOptions);

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor() {

	}

	LoadJsonData(jsonText: string) {

		var jsonObj: Object[] = JSON.parse(jsonText);

		this.LoadedOptions = [];

		jsonObj.forEach((baseOption: OptionGroupInterface) => this.LoadedOptions.push(baseOption));

		this.GenerateIDs();

		this.ValidateRequirements();

		console.log("These are the loaded options:");
		console.log(this.LoadedOptions);

		this.OptionsEvent.next(this.LoadedOptions);
	}

	SelectOption(optionItem: OptionItemInterface) {

		let selectedGroup: OptionGroupInterface = this.FindOption(optionItem.ID, OptionSearchType.GetOptionGroupByItemID);


		if (selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected).length < (selectedGroup.SelectionLimit || 99)
			|| selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected && option.ID == optionItem.ID).length == 1) {
			selectedGroup.OptionItems.find((option: OptionItemInterface) => option.ID == optionItem.ID).Selected = !optionItem.Selected;

			this.LoadedOptions.find((group) => group.ID == selectedGroup.ID)[0] = selectedGroup;

			this.ValidateRequirements();
		}
	}

	///////////////
	///// ID //////
	///////////////

	GenerateIDs() {
		let i1: number = 1;

		this.LoadedOptions.forEach((opGroup: OptionGroupInterface) => {
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

			return this.LoadedOptions.find((group) => group.ID == groupID) as OptionGroupInterface;
		}
	}

	/////////////////////////
	///// Requirements //////
	/////////////////////////

	ValidateRequirements() {
		this.LoadSelectedTraits();

		this.ValidateEnabledOptions();

		this.ValidateVisibleOptions();

		this.OptionsEvent.next(this.LoadedOptions);
	}

	LoadSelectedTraits() {
		this.SelectedTraits = [];

		this.LoadedOptions.filter(group => group.OptionItems.length > 0).forEach(
			(group) => group.OptionItems.filter((item) => item.Selected && item.Traits?.length > 0).forEach(
				item => this.SelectedTraits = this.SelectedTraits.concat(item.Traits)));

		console.log("These are the selected traits:");
		console.log(this.SelectedTraits);
	}

	ValidateEnabledOptions() {
		this.LoadedOptions.forEach((group) => {
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

		this.LoadedOptions.forEach((group) => {
			let groupVal: TraitValidationInterface = group.Validate_Visible;
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
}
