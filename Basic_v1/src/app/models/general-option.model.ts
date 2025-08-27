import { computed } from "@angular/core";

export class GeneralOptionItemModel {

	public ID: string;
	public Title: string;
	public FlavourText: string;
	public hasImage: boolean;
	public ImageURL: string;
	public ImageText: string;
	public MaxHeight: number = 400;
	public MaxWidth: number = 400;
	public Selected: boolean = false;

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor() {


	}
}
