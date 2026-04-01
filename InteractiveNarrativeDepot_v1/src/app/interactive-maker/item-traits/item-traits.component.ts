import { Component, Input, OnInit } from '@angular/core';
import { CYOAMakerService } from '../../services/cyoa-maker.service';
import { BaseItemInterface } from '../../interfaces/option.interface';
import { LoggerService } from '../../services/logger.service';
import { TraitValidationInterface } from '../../interfaces/trait-validation.interface';
import { ItemTypes } from '../../Enums/misc.enum';

@Component({
	selector: 'app-item-traits',
	templateUrl: './item-traits.component.html',
	styleUrl: './item-traits.component.css'
})
export class ItemTraitsComponent implements OnInit {

	@Input("Item") item: BaseItemInterface;

	isGroup: boolean = false;
	isItem: boolean = false;

	constructor(private cyoaServ: CYOAMakerService,
		private logger: LoggerService) {

	}

	ngOnInit() {
		this.isGroup = this.item.ItemType == ItemTypes.Group;

		if (!this.item.TraitsForEnabled) {
			this.item.TraitsForEnabled = {} as TraitValidationInterface;
		}

		if (!this.item.TraitsForNotEnabled) {
			this.item.TraitsForNotEnabled = {} as TraitValidationInterface;
		}

		if (!this.item.TraitsForVisible) {
			this.item.TraitsForVisible = {} as TraitValidationInterface;
		}

		if (!this.item.TraitsForNotVisible) {
			this.item.TraitsForNotVisible = {} as TraitValidationInterface;
		}
	}

	ClearTraits(type: string) {
		switch (type) {
			case "Trait":
				this.item.Traits = "";
				break;
			case "Enabled":
				this.item.TraitsForEnabled = {} as TraitValidationInterface;
				break;
			case "NotEnabled":
				this.item.TraitsForNotEnabled = {} as TraitValidationInterface;
				break;
			case "Visible":
				this.item.TraitsForVisible = {} as TraitValidationInterface;
				break;
			case "NotVisible":
				this.item.TraitsForNotVisible = {} as TraitValidationInterface;
				break;
		}
	}
}
