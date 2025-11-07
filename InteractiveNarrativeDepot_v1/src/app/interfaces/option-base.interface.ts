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

	Traits: string[];

	Validate_Enabled: TraitValidationInterface;
	IsEnabled: boolean;
	Validate_Visible: TraitValidationInterface;
	IsVisible: boolean;
}
