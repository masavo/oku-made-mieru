import { jest, describe, beforeEach, test, expect } from '@jest/globals';
import * as vscode from 'vscode';
import { OutputChannelManager } from '../outputChannelManager';
import { ConfigurationManager } from '../configurationManager';

jest.mock('vscode');

describe('OutputChannelManager', () => {
  let outputChannelManager: OutputChannelManager;
  let mockOutputChannel: jest.Mocked<vscode.OutputChannel>;
  let mockConfigManager: jest.Mocked<ConfigurationManager>;

  beforeEach(() => {
    mockOutputChannel = {
      appendLine: jest.fn(),
      show: jest.fn(),
    } as unknown as jest.Mocked<vscode.OutputChannel>;

    mockConfigManager = {
      isOutputChannelEnabled: jest.fn().mockReturnValue(true),
    } as unknown as jest.Mocked<ConfigurationManager>;

    (vscode.window.createOutputChannel as jest.Mock).mockReturnValue(mockOutputChannel);

    outputChannelManager = new OutputChannelManager('TestChannel', mockConfigManager);
  });

  test('log appends message to output channel', () => {
    const testMessage = 'Test message';
    outputChannelManager.log(testMessage);
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(testMessage);
  });

  test('show calls show method of output channel', () => {
    outputChannelManager.show();
    expect(mockOutputChannel.show).toHaveBeenCalled();
  });
});