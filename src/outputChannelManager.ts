import * as vscode from 'vscode';
import { ConfigurationManager } from './configurationManager';

export class OutputChannelManager {
	private outputChannel: vscode.OutputChannel;
	private configManager: ConfigurationManager;

	constructor(name: string, configManager: ConfigurationManager) {
		this.outputChannel = vscode.window.createOutputChannel(name);
		this.configManager = configManager;
	}

	public log(message: string) {
		if (this.configManager.isOutputChannelEnabled()) {
			this.outputChannel.appendLine(message);
		}
	}

	public show() {
		if (this.configManager.isOutputChannelEnabled()) {
			this.outputChannel.show();
		}
	}
}