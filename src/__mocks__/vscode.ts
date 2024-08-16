import { jest } from '@jest/globals';

export const window = {
	createStatusBarItem: jest.fn(),
	createOutputChannel: jest.fn(),
};

export const workspace = {
	getConfiguration: jest.fn(),
};

export const StatusBarAlignment = {
	Left: 1,
	Right: 2,
};

export class Hover {
	constructor(public contents: string) { }
}