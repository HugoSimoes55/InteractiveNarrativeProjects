import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoggerService {

	constructor() { }

	/********** WARNING **********
	This is a placeholder class used only for dependency injection. Check the modules.ts file.
		*****************************/


	Info(message?: any, ...optionalParams: any[]) {
	}

	Log(message?: any, ...optionalParams: any[]) {
	};

	Debug(message?: any, ...optionalParams: any[]) {
	};

	Warn(message?: any, ...optionalParams: any[]) {
	}
}
