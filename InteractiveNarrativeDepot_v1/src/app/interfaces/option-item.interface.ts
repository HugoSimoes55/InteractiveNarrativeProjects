import { OptionBaseInterface } from "./option-base.interface";

export interface OptionItemInterface extends OptionBaseInterface {

	OptionTitle: string;
	OptionText: string;
	Selected: boolean;
}