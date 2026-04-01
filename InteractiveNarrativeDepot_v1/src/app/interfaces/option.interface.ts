import { TraitValidationInterface } from "./trait-validation.interface";

export interface BaseItemInterface {

	ID: string;
	Title: string;
	ItemType: string;

	HasImage: boolean;
	ImageURL: string;
	ImageText: string;
	ImageMaxHeight: number;
	ImageMaxWidth: number;

	Traits: string;

	TraitsForEnabled: TraitValidationInterface;
	TraitsForNotEnabled: TraitValidationInterface;
	IsEnabled: boolean;
	TraitsForVisible: TraitValidationInterface;
	TraitsForNotVisible: TraitValidationInterface;
	IsVisible: boolean;
}

export interface GroupItemInterface extends BaseItemInterface {

	HeaderText: string;
	OptionItems: OptionItemInterface[];
	OptionItemsPerRow: number;
	SelectionLimit: number;
}

export interface OptionItemInterface extends BaseItemInterface {

	OptionTitle: string;
	OptionText: string;
	Selected: boolean;
}