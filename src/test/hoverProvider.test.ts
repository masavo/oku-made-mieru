import * as vscode from 'vscode';
import { HoverProvider } from '../hoverProvider';
import { JapaneseNumberConverter } from '../japaneseNumberConverter';
import { StatusBarManager } from '../statusBarManager';
import { ConfigurationManager } from '../configurationManager';
import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.mock('../japaneseNumberConverter');
jest.mock('../statusBarManager');
jest.mock('../configurationManager');

describe('HoverProvider', () => {
  let hoverProvider: HoverProvider;
  let mockConverter: jest.Mocked<JapaneseNumberConverter>;
  let mockStatusBarManager: jest.Mocked<StatusBarManager>;
  let mockConfigManager: jest.Mocked<ConfigurationManager>;

  beforeEach(() => {
    mockConverter = new JapaneseNumberConverter() as jest.Mocked<JapaneseNumberConverter>;
    mockStatusBarManager = new StatusBarManager(mockConfigManager) as jest.Mocked<StatusBarManager>;
    mockConfigManager = new ConfigurationManager() as jest.Mocked<ConfigurationManager>;

    hoverProvider = new HoverProvider(mockConverter, mockStatusBarManager, mockConfigManager);
  });

  test('provideHover returns null when hover is disabled', () => {
    mockConfigManager.isHoverEnabled.mockReturnValue(false);
    const result = hoverProvider.provideHover({} as vscode.TextDocument, {} as vscode.Position, {} as vscode.CancellationToken);
    expect(result).toBeNull();
  });

  test('provideHover returns Hover for valid number over 9999', () => {
    mockConfigManager.isHoverEnabled.mockReturnValue(true);
    const mockDocument = {
      getWordRangeAtPosition: jest.fn().mockReturnValue({ start: 0, end: 5 }),
      getText: jest.fn().mockReturnValue('10000'),
    } as unknown as vscode.TextDocument;

    mockConverter.convert.mockReturnValue('1万');

    const result = hoverProvider.provideHover(mockDocument, {} as vscode.Position, {} as vscode.CancellationToken);
    expect(result).toBeInstanceOf(vscode.Hover);
    expect((result as vscode.Hover).contents).toEqual('日本語表記: 1万');
  });

  test('provideHover returns null for number 9999 or less', () => {
    mockConfigManager.isHoverEnabled.mockReturnValue(true);
    const mockDocument = {
      getWordRangeAtPosition: jest.fn().mockReturnValue({ start: 0, end: 4 }),
      getText: jest.fn().mockReturnValue('9999'),
    } as unknown as vscode.TextDocument;

    const result = hoverProvider.provideHover(mockDocument, {} as vscode.Position, {} as vscode.CancellationToken);
    expect(result).toBeNull();
  });
});