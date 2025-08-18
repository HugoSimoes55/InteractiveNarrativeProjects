import { GeneralOptionItemModel } from "./general-option.model";

export class GeneralOptionGroupModel {

	constructor(public GroupTitle: string,
		public DisplayClass: string,
		public OptionItems: GeneralOptionItemModel[]
	) {

	}
}
