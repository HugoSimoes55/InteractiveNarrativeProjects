export class GeneralOptionItemModel {

	public LocalImageURL?: string;

	private EmptyImage: string = "assets/images/NoImageAvailable.png";
	public ImageToShow: string;

	constructor(
		public ID: number,
		public Title: string,
		public FlavourText: string,
		public hasImage: boolean,
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

		if (LocalImage) {
			this.LocalImageURL = "assets/images/" + LocalImage;
			this.ImageToShow = this.LocalImageURL;
		}

		if (this.OnlineImageURL) {
			this.ImageToShow  = this.OnlineImageURL;
		}

		if(!this.ImageToShow){
			this.ImageToShow = this.EmptyImage;
		}
	}
}
