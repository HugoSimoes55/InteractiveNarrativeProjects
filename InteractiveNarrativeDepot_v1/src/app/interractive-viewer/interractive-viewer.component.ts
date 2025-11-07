import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { OptionBaseInterface } from '../interfaces/option-base.interface';
import { OptionGroupInterface } from '../interfaces/option-group.interface';

@Component({
	selector: 'app-interractive-viewer',
	templateUrl: './interractive-viewer.component.html',
	styleUrl: './interractive-viewer.component.css'
})
export class InterractiveViewerComponent implements OnInit {

	loadedOptions: OptionGroupInterface[] = [];

	constructor(private optionServ: OptionsService) {

	}

	ngOnInit() {
		this.optionServ.OptionsEvent.subscribe((data) => {
			this.loadedOptions = data as OptionGroupInterface[];
		});
	}
}
