import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CYOAViewerService } from './services/cyoa-viewer.service';
import { CYOAMakerService } from './services/cyoa-maker.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'Interactive Narrative Depot V1';

	show_Viewer: boolean = false;
	show_Maker: boolean = !this.show_Viewer;

	constructor(private http: HttpClient,
		private cyoaServ: CYOAViewerService,
		private makerServ: CYOAMakerService) {

	}

	ngOnInit() {
		this.http.get("/assets/MarvelSymbiote_ICYOA.json", { responseType: 'text' }).subscribe((data) => {
			this.cyoaServ.LoadJsonData(data);
			this.makerServ.LoadJsonData(data);
		});

		// this.http.get("/assets/MarvelSymbiote_ICYOA - Maker.json", { responseType: 'text' }).subscribe((data) => {
		// 	this.makerServ.LoadJsonData(data);
		// });
	}

	MenuViewer() {
		this.show_Maker = false;
		this.show_Viewer = true;
	}

	MenuMaker() {
		this.show_Maker = true;
		this.show_Viewer = false;
	}
}
