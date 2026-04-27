import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemSearchType } from '../Enums/misc.enum';
import { BaseItemInterface, GroupItemInterface, OptionItemInterface } from '../interfaces/option.interface';
import { TraitValidationInterface } from '../interfaces/trait-validation.interface';
import { LoggerService } from './logger.service';

@Injectable({
	providedIn: 'root'
})
export class CYOAViewerService {

	private ViewerGroups: GroupItemInterface[] = [];

	public AllItemsEvent: BehaviorSubject<BaseItemInterface[]> = new BehaviorSubject(this.ViewerGroups);
	public VisibleItemsEvent: BehaviorSubject<BaseItemInterface[]> = new BehaviorSubject(this.ViewerGroups.filter(x => x.IsVisible));

	public AllTraits: string[] = null;
	private SelectedTraits: string[] = [];
	private SelectedVisibleTraits: string[] = [];

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor(private logger: LoggerService) {

	}

	LoadJsonData(jsonText: string) {
		this.logger.Debug("Viewer - LoadJsonData");

		this.UpdateViewerGroups(JSON.parse(jsonText));
	}

	UpdateViewerGroups(newGroups: GroupItemInterface[]) {
		this.logger.Debug("Viewer - UpdateViewerGroups Started");

		this.ViewerGroups = newGroups;

		this.logger.Debug("Viewer - Groups Loaded", this.ViewerGroups);

		this.ValidateRequirements();
	}

	private UpdateSubjects() {
		this.logger.Debug("Viewer - UpdateSubjects Started");

		this.AllItemsEvent.next(this.ViewerGroups);
		this.VisibleItemsEvent.next(this.ViewerGroups.filter(x => x.IsVisible));
	}

	SelectOption(selectedOption: OptionItemInterface) {
		this.logger.Debug("Viewer - SelectOption Started", selectedOption);

		let selectedGroup: GroupItemInterface = this.FindOption(selectedOption.ID, ItemSearchType.GetGroupByItemID);

		let selectCount: number = selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected).length;
		let deselection: boolean = selectedGroup.OptionItems.filter((option: OptionItemInterface) => option.Selected && option.ID == selectedOption.ID).length == 1;

		if (selectCount < (selectedGroup.SelectionLimit || 999)
			|| deselection) {
			selectedGroup.OptionItems.find((option: OptionItemInterface) => option.ID == selectedOption.ID).Selected = !selectedOption.Selected;

			//this.ViewerGroups.find((group) => group.ID == selectedGroup.ID)[0] = selectedGroup;

			this.ValidateRequirements();
		}
	}

	ResetSelections() {
		this.logger.Debug("Viewer - ResetSelections Started");

		this.ViewerGroups.forEach((group: GroupItemInterface) => {
			group.OptionItems.forEach((option: OptionItemInterface) => {
				option.Selected = false;
			});
		});

		this.ValidateRequirements();
	}

	///////////////
	///// ID //////
	///////////////

	private FindOption(optionID: string, optionSearch: ItemSearchType) {
		if (optionSearch == ItemSearchType.GetGroupByItemID) {

			let groupID = optionID.substring(0, optionID.lastIndexOf("_"));

			return this.ViewerGroups.find((group) => group.ID == groupID) as GroupItemInterface;
		}
	}

	///////////////////
	///// Traits //////
	///////////////////

	private ValidateRequirements() {
		this.logger.Debug("Viewer - ValidateRequirements Started");

		this.LoadSelectedTraits();

		this.ValidateEnabledItems();

		this.ValidateVisibleItems();

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
		this.logger.Debug("Viewer - LoadSelectedTraits Started");

		this.SelectedTraits = [];
		this.SelectedVisibleTraits = [];

		this.ViewerGroups.filter(group => group.OptionItems.length > 0).forEach(
			(group) => group.OptionItems.filter((item) => item.Selected && item.Traits?.length > 0).forEach(
				item => {
					this.SelectedTraits.push(item.Traits)

					if (item.IsVisible
						&& group.IsVisible) {
						this.SelectedVisibleTraits.push(item.Traits);
					}
				}
			)
		);

		this.logger.Debug("Viewer - Selected traits are", this.SelectedTraits);
	}

	private ValidateEnabledItems() {
		this.logger.Debug("Viewer - ValidateEnabledItems Started");

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

			group.OptionItems.forEach((option: OptionItemInterface) => {
				let optionNotEnable: TraitValidationInterface = option.TraitsForNotEnabled;

				let optionNotEnableBool: boolean = this.GenericValidateTraits(optionNotEnable, this.SelectedTraits);

				if (Object.keys(optionNotEnable).length > 0
					&& optionNotEnableBool) {
					option.IsEnabled = false;
				}
				else {
					let optionEnable: TraitValidationInterface = option.TraitsForEnabled;

					let optionEnableBool: boolean = this.GenericValidateTraits(optionEnable, this.SelectedTraits);

					option.IsEnabled = optionEnableBool;
				}
			});
			// }
		});
	}

	private ValidateVisibleItems() {
		this.logger.Debug("Viewer - ValidateVisibleItems Started");

		this.ViewerGroups.forEach((group) => {
			let groupNotVis: TraitValidationInterface = group.TraitsForNotVisible;

			let groupNotVisBool: boolean = this.GenericValidateTraits(groupNotVis, this.SelectedVisibleTraits);

			if (Object.keys(groupNotVis).length > 0
				&& groupNotVisBool) {
				group.IsVisible = false;

				group.OptionItems.forEach((item: OptionItemInterface) => {
					item.IsVisible = true;
				});
			}
			else {
				let groupVis: TraitValidationInterface = group.TraitsForVisible;

				let groupVisBool: boolean = this.GenericValidateTraits(groupVis, this.SelectedVisibleTraits);

				group.IsVisible = groupVisBool;

				group.OptionItems.forEach((option: OptionItemInterface) => {
					let optionNotVis: TraitValidationInterface = option.TraitsForNotVisible;

					let optionNotVisBool: boolean = this.GenericValidateTraits(optionNotVis, this.SelectedVisibleTraits);

					if (Object.keys(optionNotVis).length > 0
						&& optionNotVisBool) {
						option.IsVisible = false;
					}
					else {
						let optionVis: TraitValidationInterface = option.TraitsForVisible;

						let optionVisBool: boolean = this.GenericValidateTraits(optionVis, this.SelectedVisibleTraits);

						option.IsVisible = optionVisBool;
					}
				});
			}
		});

		this.logger.Debug("Viewer - Groups Updated", this.ViewerGroups);

		let oldTraits = this.SelectedVisibleTraits;
		this.LoadSelectedTraits();

		if (oldTraits.length !== this.SelectedVisibleTraits.length
			|| !oldTraits.every((value, index) => value === this.SelectedVisibleTraits[index])) {
			this.ValidateRequirements();
		}
	}

	private GenericValidateTraits(val: TraitValidationInterface, traits: string[]): boolean {
		this.logger.Debug("Viewer - GenericValidateTraits Started");

		if (!val
			|| !val.Traits
		) {
			return true;
		}

		let result: boolean = true;

		let valTraits: string[] = val?.Traits.split(',');
		let matchCount: number = 0;

		valTraits.forEach((trait) => {
			if (traits.includes(trait)) {
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
