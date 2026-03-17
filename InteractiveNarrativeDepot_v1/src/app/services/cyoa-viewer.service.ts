import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionSearchType } from '../Enums/option-search-type.enum';
import { OptionBaseInterface, OptionGroupInterface, OptionItemInterface } from '../interfaces/option.interface';
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
		this.UpdateViewerGroups(JSON.parse(jsonText));
	}

	UpdateViewerGroups(newGroups: OptionGroupInterface[]) {
		this.ViewerGroups = newGroups;

		this.InitializeViewerAttributes();

		this.GenerateIDs();

		this.ValidateRequirements();
	}

	private InitializeViewerAttributes() {
		this.ViewerGroups.forEach((group: OptionGroupInterface) => {
			group.OptionItemsPerRow = (group.OptionItemsPerRow || 5);
		});
	}

	private UpdateSubjects() {
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

			//this.ViewerGroups.find((group) => group.ID == selectedGroup.ID)[0] = selectedGroup;

			this.ValidateRequirements();
		}
	}

	ResetSelections() {

		this.ViewerGroups.forEach((group: OptionGroupInterface) => {
			group.OptionItems.forEach((option: OptionItemInterface) => {
				option.Selected = false;
			});
		});

		this.ValidateRequirements();
	}

	///////////////
	///// ID //////
	///////////////

	private GenerateIDs() {
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

	private FindOption(optionID: string, optionSearch: OptionSearchType) {
		if (optionSearch == OptionSearchType.GetOptionGroupByItemID) {

			let groupID = optionID.substring(0, optionID.lastIndexOf("_"));

			return this.ViewerGroups.find((group) => group.ID == groupID) as OptionGroupInterface;
		}
	}

	///////////////////
	///// Traits //////
	///////////////////

	private ValidateRequirements() {

		this.LoadSelectedTraits();

		this.ValidateEnabledOptions();

		this.ValidateVisibleOptions();

		this.GetAllTraits();

		this.UpdateSubjects();
	}

	private GetAllTraits() {
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

	private LoadSelectedTraits() {
		this.SelectedTraits = [];

		this.ViewerGroups.filter(group => group.OptionItems.length > 0).forEach(
			(group) => group.OptionItems.filter((item) => item.Selected && item.Traits?.length > 0).forEach(
				item => this.SelectedTraits.push(item.Traits)
			)
		);

		console.log("These are the selected traits:");
		console.log(this.SelectedTraits);
	}

	// private ValidateEnabledOptions() {
	// 	this.ViewerGroups.forEach((group) => {
	// 		let groupEnabled = true;

	// 		// Add group validation code here

	// 		group.IsEnabled = groupEnabled;

	// 		group.OptionItems.forEach((item) => {
	// 			if (!groupEnabled) {
	// 				item.IsEnabled = false;
	// 				return;
	// 			}

	// 			let itemEnabled = true;

	// 			// Add item validation code here

	// 			item.IsEnabled = itemEnabled;
	// 		});
	// 	});
	// }

	private ValidateEnabledOptions() {

		this.ViewerGroups.forEach((group) => {
			// let groupNotEnable: TraitValidationInterface = group.TraitsForNotEnabled;

			// let groupNotEnableBool: boolean = this.GenericValidateTraits(groupNotEnable);

			// if (groupNotEnable
			// 	&& groupNotEnableBool) {
			// 	group.IsEnabled = false;

			// 	group.OptionItems.forEach((item: OptionItemInterface) => {
			// 		item.IsEnabled = true;
			// 	});
			// }
			// else {
			// let groupEnable: TraitValidationInterface = group.TraitsForEnabled;

			// let groupEnableBool: boolean = this.GenericValidateTraits(groupEnable);

			// group.IsEnabled = groupEnableBool;

			group.OptionItems.forEach((item: OptionItemInterface) => {
				let itemNotEnable: TraitValidationInterface = item.TraitsForNotEnabled;

				let itemNotEnableBool: boolean = this.GenericValidateTraits(itemNotEnable);

				if (itemNotEnable
					&& itemNotEnableBool) {
					item.IsEnabled = false;
				}
				else {
					let itemEnable: TraitValidationInterface = item.TraitsForEnabled;

					let itemEnableBool: boolean = this.GenericValidateTraits(itemEnable);

					item.IsEnabled = itemEnableBool;
				}
			});
			// }
		});
	}

	private ValidateVisibleOptions() {

		this.ViewerGroups.forEach((group) => {
			let groupNotVis: TraitValidationInterface = group.TraitsForNotVisible;

			let groupNotVisBool: boolean = this.GenericValidateTraits(groupNotVis);

			if (groupNotVis
				&& groupNotVisBool) {
				group.IsVisible = false;

				group.OptionItems.forEach((item: OptionItemInterface) => {
					item.IsVisible = true;
				});
			}
			else {
				let groupVis: TraitValidationInterface = group.TraitsForVisible;

				let groupVisBool: boolean = this.GenericValidateTraits(groupVis);

				group.IsVisible = groupVisBool;

				group.OptionItems.forEach((item: OptionItemInterface) => {
					let itemNotVis: TraitValidationInterface = item.TraitsForNotVisible;

					let itemNotVisBool: boolean = this.GenericValidateTraits(itemNotVis);

					if (itemNotVis
						&& itemNotVisBool) {
						item.IsVisible = false;
					}
					else {
						let itemVis: TraitValidationInterface = item.TraitsForVisible;

						let itemVisBool: boolean = this.GenericValidateTraits(itemVis);

						item.IsVisible = itemVisBool;
					}
				});
			}
		});
	}

	private GenericValidateTraits(val: TraitValidationInterface): boolean {
		if (!val) {
			return true;
		}

		let result: boolean = true;

		let valTraits: string[] = val?.Traits.split(',');
		let matchCount: number = 0;

		valTraits.forEach((trait) => {
			if (this.SelectedTraits.includes(trait)) {
				matchCount++;
			};
		});

		switch (val.MatchType) {
			case "Any":
				result = matchCount > 0;
				break;
			case "All":
				result = matchCount == valTraits.length;
				break;
		}

		return result;
	}
}
