import { OptionRequirementModel } from "./option-requirement.model";

export class OptionItemModel {

	public ID: string;
	public Title: string;
	public FlavourText: string;
	public hasImage: boolean;
	public ImageURL: string;
	public ImageText: string;
	public MaxHeight: number = 400;
	public MaxWidth: number = 400;
	public Selected: boolean = false;
	public Requirements: OptionRequirementModel[];
	public RequirementVisibility: boolean;

	private EmptyImage: string = "assets/images/NoImageAvailable.png";
}
