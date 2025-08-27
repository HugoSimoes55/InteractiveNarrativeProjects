import { GeneralOptionItemModel } from "./general-option.model";

export class GeneralOptionGroupModel {

	public ID: string;
	public Title: string;
	public HeaderText: string;
	public DisplayClass: string;
	public SelectionLimit: number;
	public OptionItems: GeneralOptionItemModel[];

	constructor() {

	}
}
