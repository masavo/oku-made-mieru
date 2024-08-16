import * as vscode from 'vscode';
import { ConfigurationManager } from '../configurationManager';
import { jest, describe, beforeEach, test, expect } from '@jest/globals';
jest.mock('vscode');

describe('ConfigurationManager', () => {
	let configManager: ConfigurationManager;
	let mockGetConfiguration: jest.Mock;

	beforeEach(() => {
		mockGetConfiguration = jest.fn();
		(vscode.workspace.getConfiguration as jest.Mock).mockReturnValue({
			get: mockGetConfiguration,
		});
		configManager = new ConfigurationManager();
	});

	test('isStatusBarEnabled returns correct value', () => {
		mockGetConfiguration.mockReturnValue(true);
		expect(configManager.isStatusBarEnabled()).toBe(true);

		mockGetConfiguration.mockReturnValue(false);
		expect(configManager.isStatusBarEnabled()).toBe(false);
	});

	test('isHoverEnabled returns correct value', () => {
		mockGetConfiguration.mockReturnValue(true);
		expect(configManager.isHoverEnabled()).toBe(true);

		mockGetConfiguration.mockReturnValue(false);
		expect(configManager.isHoverEnabled()).toBe(false);
	});

	test('updateConfiguration is called in constructor', () => {
		expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('okuMadeMieru');
	});
});