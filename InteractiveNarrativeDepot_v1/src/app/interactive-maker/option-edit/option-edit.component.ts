import { Component, Input } from '@angular/core';
import { OptionGroupInterface } from '../../interfaces/option-group.interface';
import { CYOAViewerService } from '../../services/cyoa-viewer.service';

@Component({
	selector: 'app-option-edit',
	templateUrl: './option-edit.component.html',
	styleUrl: './option-edit.component.css'
})
export class OptionEditComponent {

	@Input("Group") optionGroup: OptionGroupInterface;

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {

	}
}
