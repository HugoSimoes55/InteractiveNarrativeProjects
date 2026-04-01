import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CYOAViewerService } from './services/cyoa-viewer.service';
import { CYOAMakerService } from './services/cyoa-maker.service';
import { LoggerService } from './services/logger.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'Interactive Narrative Depot V1';

	show_Viewer: boolean = false;
	show_Maker: boolean = !this.show_Viewer;

	private selectedJSON: string = "/assets/MarvelSymbiote_ICYOA.json";

	constructor(private http: HttpClient,
		private viewerServ: CYOAViewerService,
		private makerServ: CYOAMakerService,
		private logger: LoggerService) {

	}

	ngOnInit() {
		this.logger.Info("App Initialized");
		this.logger.Log("Selected JSON is", this.selectedJSON);


		this.http.get(this.selectedJSON, { responseType: 'text' }).subscribe((data) => {
			//this.viewerServ.LoadJsonData(data);
			this.makerServ.LoadJsonData(data);
		});
	}

	MenuViewer() {
		this.show_Maker = false;
		this.show_Viewer = true;

		this.logger.Info("Viewer Menu picked");
	}

	MenuMaker() {
		this.show_Maker = true;
		this.show_Viewer = false;

		this.logger.Info("Maker Menu picked");
	}
}
