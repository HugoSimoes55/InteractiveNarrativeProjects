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
	IsEnabled: boolean;
	TraitsForVisible: TraitValidationInterface;
	IsVisible: boolean;
}
