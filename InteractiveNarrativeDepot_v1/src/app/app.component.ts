import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OptionsService } from './services/options.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'Interactive Narrative Depot V1';

	constructor(private http: HttpClient,
		private optionserv: OptionsService) {

	}

	ngOnInit() {
		this.http.get("/assets/MarvelSymbiote_ICYOA.json", { responseType: 'text' }).subscribe((data) => {
			this.optionserv.LoadJsonData(data);
		});
	}
}
