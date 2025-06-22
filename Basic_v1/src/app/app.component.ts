import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionItemComponent } from './option-item/option-item.component';
import { Title } from '@angular/platform-browser';
import { OptionsService } from './services/options.service';
import { GeneralOptionModel } from './models/general-option.model';
import { OptionGroupsEnum } from './models/option-groups.enum';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		OptionItemComponent,
		CommonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	providers: [OptionsService]
})
export class AppComponent implements OnInit {
	title = 'CYOA Basic v1';
	genders: GeneralOptionModel[] = [];
	eyeColors: GeneralOptionModel[] = [];

	constructor(private titleService: Title, private optionServ: OptionsService) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit() {
		this.SimulateData();

		// Get Data
		this.genders = this.optionServ.GetOptions(OptionGroupsEnum.Gender);
		this.eyeColors = this.optionServ.GetOptions(OptionGroupsEnum.EyeColor);
	}

	SimulateData() {
		let aux: GeneralOptionModel[];

		// Gender Data
		aux = [];

		aux.push(new GeneralOptionModel(1, "Male", this.MaleGenderURL, this.MaleGenderLocal));
		aux.push(new GeneralOptionModel(2, "Female", this.FemaleGenderURL, null));

		this.optionServ.SetOption(OptionGroupsEnum.Gender, aux.slice());

		// HairColor Data
		aux = [];

		aux.push(new GeneralOptionModel(1, "Blond", "", null, 50, 50));

		// EyeColor Data
		aux = [];

		aux.push(new GeneralOptionModel(1, "Red", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Blue", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Green", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Brown", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Yellow", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Pink", this.PinkEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Purple", this.RainbowEyeColor, null, 100, 100));
		aux.push(new GeneralOptionModel(1, "Rainbow", this.RainbowEyeColor, null, 100, 100));

		this.optionServ.SetOption(OptionGroupsEnum.EyeColor, aux.slice());
	}

	// URLs
	// Gender
	private MaleGenderURL: string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/90a04619-7e0a-4a4b-b929-e038802f40a6/d6gbbwc-c7d41148-2bfe-43d2-b93a-b1dd9cd1ed99.jpg/v1/fill/w_1024,h_1581,q_75,strp/superman_by_marconelor_d6gbbwc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU4MSIsInBhdGgiOiJcL2ZcLzkwYTA0NjE5LTdlMGEtNGE0Yi1iOTI5LWUwMzg4MDJmNDBhNlwvZDZnYmJ3Yy1jN2Q0MTE0OC0yYmZlLTQzZDItYjkzYS1iMWRkOWNkMWVkOTkuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HzOFHI7YJTUY8K6vr0o7ZvPXHUz0UbY27N8qPYUpgwI";
	private FemaleGenderURL: string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/981d680a-9582-442f-ac31-452016dfbe75/djvnkmt-8e235e4e-8d7c-4c88-a1e4-2b7c68e1a8ec.jpg/v1/fill/w_1024,h_1821,q_75,strp/vintage_tribute___wonder_woman_4_by_danielbdesigns_djvnkmt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4MWQ2ODBhLTk1ODItNDQyZi1hYzMxLTQ1MjAxNmRmYmU3NVwvZGp2bmttdC04ZTIzNWU0ZS04ZDdjLTRjODgtYTFlNC0yYjdjNjhlMWE4ZWMuanBnIiwiaGVpZ2h0IjoiPD0xODIxIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvOTgxZDY4MGEtOTU4Mi00NDJmLWFjMzEtNDUyMDE2ZGZiZTc1XC9kYW5pZWxiZGVzaWducy00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.qL6zbWRlN3UfxuABe2TijYx4FnmppYwYOY3mRZMQX1s";
	private MaleGenderLocal = "Male.png";
	private FemaleGenderLocal = "Female.png";
	
	// Eye Colors
	private PinkEyeColor: string = "https://i.pinimg.com/736x/2c/f8/62/2cf86283cf5cc356cf4bc2058d5f4f32.jpg";
	private RainbowEyeColor: string = "https://w0.peakpx.com/wallpaper/767/941/HD-wallpaper-rainbow-eye-rainbow-eyes-rainbow-homosexual-eye-thumbnail.jpg";

}
