import { Component, OnInit } from '@angular/core';
import { CYOAMakerService } from '../services/cyoa-maker.service';
import { GroupItemInterface } from '../interfaces/option.interface';

@Component({
	selector: 'app-interactive-maker',
	templateUrl: './interactive-maker.component.html',
	styleUrl: './interactive-maker.component.css'
})
export class InteractiveMakerComponent implements OnInit {

	loadedGroups: GroupItemInterface[] = [];

	constructor(private cyoaServ: CYOAMakerService) {

	}

	ngOnInit() {
		this.cyoaServ.AllItemsEvent.subscribe((data) => {
			this.loadedGroups = data as GroupItemInterface[];
		});
	}

	AddNewGroup() {
		this.cyoaServ.AddGroup();
	}

	SaveChanges() {
		this.cyoaServ.Save();
	}
}
