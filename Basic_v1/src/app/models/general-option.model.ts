import { computed } from "@angular/core";

export class GeneralOptionItemModel {

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor(
		public ID: number,
		public Title: string,
		public FlavourText: string,
		public hasImage: boolean,
		public ImageURL?: string,
		public MaxHeight: number = 400,
		public MaxWidth: number = 400) {

	}
}
