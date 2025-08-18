import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OptionItemComponent } from './option-item/option-item.component';
import { Title } from '@angular/platform-browser';
import { OptionsService } from './services/options.service';
import { GeneralOptionItemModel } from './models/general-option.model';
import { OptionGroupsEnum } from './models/option-groups.enum';
import { CommonModule } from '@angular/common';
import { OptionGroupComponent } from './option-group/option-group.component';
import { GeneralOptionGroupModel } from './models/general-option-group.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		OptionItemComponent,
		OptionGroupComponent,
		CommonModule
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	providers: [OptionsService]
})
export class AppComponent implements OnInit {
	title = 'CYOA Basic v1';
	optionGroup: GeneralOptionGroupModel[] = [];

	constructor(private titleService: Title, private optionServ: OptionsService) {
		this.titleService.setTitle(this.title);
	}

	ngOnInit() {
		this.SimulateData();
	}

	SimulateData() {
		let groupAux: GeneralOptionGroupModel;
		let optionAux: GeneralOptionItemModel[];

		// Gender Data
		groupAux = null;
		optionAux = [];

		let defaultGenderMeasure: number = 500;

		optionAux.push(new GeneralOptionItemModel(1, "Male", null, true, this.MaleGenderURL, this.MaleGenderLocal, defaultGenderMeasure, defaultGenderMeasure));
		optionAux.push(new GeneralOptionItemModel(2, "Female", null, true, this.FemaleGenderURL, null, defaultGenderMeasure, defaultGenderMeasure));

		this.optionServ.SetOption(OptionGroupsEnum.Gender, optionAux.slice());

		groupAux = new GeneralOptionGroupModel("Gender", "group-1", optionAux);

		this.optionGroup.push(groupAux);

		// HairColor Data
		groupAux = null;
		optionAux = [];

		let defaultHairMeasure: number = 300;

		optionAux.push(new GeneralOptionItemModel(1, "Blond", null, true, this.BlondHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Brunette", null, true, this.BrunetteHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Ravenette", null, true, this.RavenetteHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Redhead", null, true, this.RedheadHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Pinkette", null, true, this.PinketteHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Bluenette", null, true, this.BluenetteHair, null, defaultHairMeasure, defaultHairMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Rainbow", null, true, this.RainbowHair, null, defaultHairMeasure, defaultHairMeasure));

		this.optionServ.SetOption(OptionGroupsEnum.HairColor, optionAux.slice());

		groupAux = new GeneralOptionGroupModel("Hair Color", "group-1", optionAux);

		this.optionGroup.push(groupAux);
		
		// EyeColor Data
		groupAux = null;
		optionAux = [];

		let defaultEyeMeasure: number = 250;

		optionAux.push(new GeneralOptionItemModel(1, "Red", null, true, this.RedEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Blue", null, true, this.BlueEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Green", null, true, this.GreenEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Yellow", null, true, this.YellowEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Pink", null, true, this.PinkEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Purple", null, true, this.PurpleEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Brown", null, true, this.BrownEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Black", null, true, this.BlackEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "White", null, true, this.WhiteEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));
		optionAux.push(new GeneralOptionItemModel(1, "Rainbow", null, true, this.RainbowEyeColor, null, defaultEyeMeasure, defaultEyeMeasure));

		this.optionServ.SetOption(OptionGroupsEnum.EyeColor, optionAux.slice());

		groupAux = new GeneralOptionGroupModel("Eye Color", "group-1", optionAux);

		this.optionGroup.push(groupAux);
	}

	// URLs
	// Gender
	private MaleGenderURL: string = "https://i.pinimg.com/736x/6b/47/b6/6b47b6d6743f01b2a43f493cbe8c743d.jpg";
	private FemaleGenderURL: string = "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/streams/2012/February/120220/59168-wbenedettiF0F4C66C-9502-410A-BC3C-7306BD13973D.jpg";
	private MaleGenderLocal = "Male.png";
	private FemaleGenderLocal = "Female.png";

	// Hair Colors

	private BlondHair: string = "https://cdnb.artstation.com/p/assets/images/images/002/938/369/large/svetlana-tigai-blonde-hair-1000px-72-dpi.jpg?1467532459";
	private BrunetteHair: string = "https://i.pinimg.com/originals/82/81/06/8281064008dea39393e32760bee38baf.jpg";
	private RavenetteHair: string = "https://media.craiyon.com/2025-04-27/FSrWPKdUQgS6pP2rfSvjnw.webp";
	private RedheadHair: string = "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/11beb7b7-c42b-40f8-aa56-ef8cb56043cb/532090d7-15fa-4ae7-a46a-1f1f358f9a2b.png";
	private PinketteHair: string = "https://img.freepik.com/premium-vector/drawing-girl-with-pink-hair-pink-hair_1023984-24131.jpg";
	private BluenetteHair: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVw8TWqcR5yB6vHG5pbmKgpmLNAUQJm2Ix6w&s";
	private RainbowHair: string = "https://r2.starryai.com/results/1027414879/d6812944-43d9-40b8-9ece-c5527d23ebf9.webp";


	// Eye Colors
	private RedEyeColor: string = "https://i.pinimg.com/736x/ba/6c/c6/ba6cc622fcc03bce95a114cd5459bda4.jpg";
	private BlueEyeColor: string = "https://a0.anyrgb.com/pngimg/608/1760/corneal-endothelium-dry-eye-cornea-eye-examination-eye-color-human-eye-ophthalmology-tears-eyelash-extensions-iris.png";
	private GreenEyeColor: string = "https://i.pinimg.com/736x/96/c7/45/96c745bba9d6cf7aaa163d9089f77e4f.jpg";
	private YellowEyeColor: string = "https://thumbs.dreamstime.com/b/detailed-sketch-yellow-eye-highlighting-intricate-textures-colors-captivating-showcases-striking-emphasizing-its-vibrant-340878890.jpg";
	private PinkEyeColor: string = "https://i.pinimg.com/736x/2c/f8/62/2cf86283cf5cc356cf4bc2058d5f4f32.jpg";
	private PurpleEyeColor: string = "https://i.pinimg.com/564x/f9/d9/ca/f9d9ca123edd5e401d530edfbf92cf86.jpg";
	private BrownEyeColor: string = "https://cdna.artstation.com/p/assets/images/images/007/092/608/large/christina-kornilova-brown-eye-by-blackrysh.jpg?1503612957";
	private BlackEyeColor: string = "https://i.pinimg.com/474x/23/90/7f/23907fe5a65e6ae4decbad50a6df3260.jpg";
	private WhiteEyeColor: string = "https://i.pinimg.com/736x/5a/cf/f0/5acff0105eaab461e80c349f84f5c340.jpg";
	private RainbowEyeColor: string = "https://w0.peakpx.com/wallpaper/767/941/HD-wallpaper-rainbow-eye-rainbow-eyes-rainbow-homosexual-eye-thumbnail.jpg";

}
