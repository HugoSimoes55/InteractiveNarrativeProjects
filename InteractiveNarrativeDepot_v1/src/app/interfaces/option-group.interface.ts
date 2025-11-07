import { OptionBaseInterface } from "./option-base.interface";
import { OptionItemInterface } from "./option-item.interface";

export interface OptionGroupInterface extends OptionBaseInterface {

	HeaderText: string;
	DisplayClass: string;
	OptionItems: OptionItemInterface[];
	SelectionLimit: number;
}
