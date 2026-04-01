import { Component, OnInit } from '@angular/core';
import { GroupItemInterface } from '../interfaces/option.interface';
import { CYOAViewerService } from '../services/cyoa-viewer.service';

@Component({
	selector: 'app-interactive-viewer',
	templateUrl: './interactive-viewer.component.html',
	styleUrl: './interactive-viewer.component.css'
})
export class InteractiveViewerComponent implements OnInit {

	loadedGroups: GroupItemInterface[] = [];

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {
		this.cyoaServ.VisibleItemsEvent.subscribe((data) => {
			this.loadedGroups = data as GroupItemInterface[];
		});
	}

	ResetSelections() {
		this.cyoaServ.ResetSelections();
	}
}
