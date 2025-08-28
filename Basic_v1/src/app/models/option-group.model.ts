import { OptionItemModel } from "./option-item.model";
import { OptionRequirementModel } from "./option-requirement.model";

export class OptionGroupModel {

	public ID: string;
	public Title: string;
	public HeaderText: string;
	public DisplayClass: string;
	public OptionItems: OptionItemModel[];
	public SelectionLimit: number;
	public Requirements: OptionRequirementModel[];
	public RequirementVisibility: boolean;
}
