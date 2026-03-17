import { TraitValidationInterface } from "./trait-validation.interface";

export interface OptionBaseInterface {

	ID: string;
	Title: string;
	OptionType: string;

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

export interface OptionGroupInterface extends OptionBaseInterface {

	HeaderText: string;
	OptionItems: OptionItemInterface[];
	OptionItemsPerRow: number;
	SelectionLimit: number;
}

export interface OptionItemInterface extends OptionBaseInterface {

	OptionTitle: string;
	OptionText: string;
	Selected: boolean;
}