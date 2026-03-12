import { Component, OnInit } from '@angular/core';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { CYOAMakerService } from '../services/cyoa-maker.service';

@Component({
	selector: 'app-interactive-maker',
	templateUrl: './interactive-maker.component.html',
	styleUrl: './interactive-maker.component.css'
})
export class InteractiveMakerComponent implements OnInit {

	loadedGroups: OptionGroupInterface[] = [];

	constructor(private cyoaServ: CYOAMakerService) {

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
		this.cyoaServ.Save();
	}
}
