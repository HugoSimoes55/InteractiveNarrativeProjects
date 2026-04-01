import { Component, Input } from '@angular/core';
import { CYOAMakerService } from '../../services/cyoa-maker.service';
import { GroupItemInterface } from '../../interfaces/option.interface';

@Component({
	selector: 'app-group-edit',
	templateUrl: './group-edit.component.html',
	styleUrl: './group-edit.component.css'
})
export class GroupEditComponent {

	@Input("Group") group: GroupItemInterface;

	plusIcon: string = "/assets/icons/Plus_Icon.png";
	minusIcon: string = "/assets/icons/Minus_Icon.png";

	expanded: boolean = false;

	constructor(private cyoaServ: CYOAMakerService) {

	}

	ngOnInit() {
		if (this.group) {
			if (!this.group.SelectionLimit) {
				this.group.SelectionLimit = 0;
			}
		}
	}

	expandGroup() {
		this.expanded = !this.expanded;
	}

	NewOption() {
		this.cyoaServ.AddOption(this.group);
	}
}
