import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
	providedIn: 'root'
})
export class ConsoleLoggerService {

	constructor() { }

	Info(message?: any, ...optionalParams: any[]) {

		console.info(...[message, ...optionalParams]);
	}

	Log(message?: any, ...optionalParams: any[]) {
		console.log(...[message, ...optionalParams]);
	};

	Debug(message?: any, ...optionalParams: any[]) {
		console.debug(...[message, ...optionalParams]);
	};

	Warn(message?: any, ...optionalParams: any[]) {
		console.warn(...[message, ...optionalParams]);
	}
}
