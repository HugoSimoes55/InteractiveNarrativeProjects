export class GeneralOptionModel {

	public hasImage: boolean;
	public LocalImageURL?: string;

	constructor(
		public ID: number,
		public DisplayText: string,
		public OnlineImageURL?: string,
		LocalImage?: string,
		public MaxHeight: number = 400,
		public MaxWidth: number = 400) {

		this.hasImage = OnlineImageURL || LocalImage ? true : false;

		if (LocalImage) {
			this.LocalImageURL = "assets/images/" + LocalImage;
		}
	}
}
