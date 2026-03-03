import { Component, OnInit } from '@angular/core';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { CYOAViewerService } from '../services/cyoa-viewer.service';

@Component({
	selector: 'app-interactive-maker',
	templateUrl: './interactive-maker.component.html',
	styleUrl: './interactive-maker.component.css'
})
export class InteractiveMakerComponent implements OnInit {

	loadedGroups: OptionGroupInterface[] = [];

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {
		this.cyoaServ.AllOptionsEvent.subscribe((data) => {
			this.loadedGroups = data as OptionGroupInterface[];
		});
	}

	AddNewGroup() {
		this.cyoaServ.AddGroup();
	}

	SaveChanges() {
		console.log(this.loadedGroups);
	}
}
