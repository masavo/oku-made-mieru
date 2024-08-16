import * as vscode from 'vscode';
import { StatusBarManager } from '../statusBarManager';
import { ConfigurationManager } from '../configurationManager';
import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.mock('vscode');
jest.mock('../configurationManager');
jest.mock('../japaneseNumberConverter');

describe('StatusBarManager', () => {
  let statusBarManager: StatusBarManager;
  let mockConfigManager: jest.Mocked<ConfigurationManager>;
  let mockStatusBarItem: jest.Mocked<vscode.StatusBarItem>;

  beforeEach(() => {
    mockConfigManager = new ConfigurationManager() as jest.Mocked<ConfigurationManager>;
    mockStatusBarItem = {
      show: jest.fn(),
      hide: jest.fn(),
      text: '',
    } as unknown as jest.Mocked<vscode.StatusBarItem>;

    (vscode.window.createStatusBarItem as jest.Mock).mockReturnValue(mockStatusBarItem);

    statusBarManager = new StatusBarManager(mockConfigManager);
  });

  test('updateVisibility shows status bar when enabled', () => {
    mockConfigManager.isStatusBarEnabled.mockReturnValue(true);
    statusBarManager.updateVisibility();
    expect(mockStatusBarItem.show).toHaveBeenCalled();
  });

  test('updateVisibility hides status bar when disabled', () => {
    mockConfigManager.isStatusBarEnabled.mockReturnValue(false);
    statusBarManager.updateVisibility();
    expect(mockStatusBarItem.hide).toHaveBeenCalled();
  });

  test('updateContent updates text correctly', () => {
    const mockEditor = {
      selection: { isEmpty: false },
      document: { getText: jest.fn().mockReturnValue('10000') },
    };
    (vscode.window.activeTextEditor as unknown) = mockEditor;

    mockConfigManager.isStatusBarEnabled.mockReturnValue(true);
    statusBarManager.updateContent();

    expect(mockStatusBarItem.text).toContain('日本語表記:');
  });
});