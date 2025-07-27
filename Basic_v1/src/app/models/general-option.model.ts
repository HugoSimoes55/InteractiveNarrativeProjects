export class GeneralOptionModel {

	public hasImage: boolean;
	public LocalImageURL?: string;

	private EmptyImage: string = "assets/images/NoImageAvailable.png";

	constructor(
		public ID: number,
		public DisplayText: string,
		public OnlineImageURL?: string,
		LocalImage?: string,
		public MaxHeight: number = 400,
		public MaxWidth: number = 400) {

		if (!OnlineImageURL) {
			OnlineImageURL = "";
		}

		if (!LocalImage) {
			LocalImage = "";
		}

		this.hasImage = OnlineImageURL != "" || LocalImage != "" ? true : false;

		if (LocalImage) {
			this.LocalImageURL = "assets/images/" + LocalImage;
		}

		if (this.hasImage
			&& (this.OnlineImageURL + this.LocalImageURL) == "") {
			this.LocalImageURL = this.EmptyImage;
		}
	}
}
