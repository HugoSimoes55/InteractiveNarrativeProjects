import { KeyValue } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { GeneralOptionModel } from '../models/general-option.model';
import { OptionGroupsEnum } from '../models/option-groups.enum';

@Injectable({
	providedIn: 'root'
})
export class OptionsService implements OnInit {

	private allOptions: KeyValue<string, GeneralOptionModel[]> = new { "Start":string,  null:any};

	constructor() {

	}

	ngOnInit(): void {
		// Fill All Options
		this.allOptions[OptionGroupsEnum.Gender] = this.GetGenders();
		this.allOptions[OptionGroupsEnum.HairColor] = this.GetHairColors();

		console.log(this.allOptions);
	}

	GetOptions(optionGroup: OptionGroupsEnum) {
		return this.allOptions[optionGroup];
	}

	// Data Functions

	private GetGenders() {
		let genders: Array<GeneralOptionModel>;

		genders.push(new GeneralOptionModel(1, "Male", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/90a04619-7e0a-4a4b-b929-e038802f40a6/d6gbbwc-c7d41148-2bfe-43d2-b93a-b1dd9cd1ed99.jpg/v1/fill/w_1024,h_1581,q_75,strp/superman_by_marconelor_d6gbbwc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTU4MSIsInBhdGgiOiJcL2ZcLzkwYTA0NjE5LTdlMGEtNGE0Yi1iOTI5LWUwMzg4MDJmNDBhNlwvZDZnYmJ3Yy1jN2Q0MTE0OC0yYmZlLTQzZDItYjkzYS1iMWRkOWNkMWVkOTkuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HzOFHI7YJTUY8K6vr0o7ZvPXHUz0UbY27N8qPYUpgwI", null));
		genders.push(new GeneralOptionModel(2, "Female", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/981d680a-9582-442f-ac31-452016dfbe75/djvnkmt-8e235e4e-8d7c-4c88-a1e4-2b7c68e1a8ec.jpg/v1/fill/w_1024,h_1821,q_75,strp/vintage_tribute___wonder_woman_4_by_danielbdesigns_djvnkmt-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4MWQ2ODBhLTk1ODItNDQyZi1hYzMxLTQ1MjAxNmRmYmU3NVwvZGp2bmttdC04ZTIzNWU0ZS04ZDdjLTRjODgtYTFlNC0yYjdjNjhlMWE4ZWMuanBnIiwiaGVpZ2h0IjoiPD0xODIxIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvOTgxZDY4MGEtOTU4Mi00NDJmLWFjMzEtNDUyMDE2ZGZiZTc1XC9kYW5pZWxiZGVzaWducy00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.qL6zbWRlN3UfxuABe2TijYx4FnmppYwYOY3mRZMQX1s", null));

		return genders;
	}

	private GetHairColors() {

	}

}
