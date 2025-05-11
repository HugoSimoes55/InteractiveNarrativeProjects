import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-maker-option',
	standalone: true,
	imports: [],
	templateUrl: './maker-option.component.html',
	styleUrl: './maker-option.component.css'
})
export class MakerOptionComponent {
	@Input("OptionText") optionText: string;
}
