import { Component, OnInit } from '@angular/core';
import { OptionGroupInterface } from '../interfaces/option-group.interface';
import { CYOAViewerService } from '../services/cyoa-viewer.service';

@Component({
	selector: 'app-interactive-viewer',
	templateUrl: './interactive-viewer.component.html',
	styleUrl: './interactive-viewer.component.css'
})
export class InteractiveViewerComponent implements OnInit {

	loadedGroups: OptionGroupInterface[] = [];

	constructor(private cyoaServ: CYOAViewerService) {

	}

	ngOnInit() {
		this.cyoaServ.VisibleOptionsEvent.subscribe((data) => {
			this.loadedGroups = data as OptionGroupInterface[];
		});
	}
}
