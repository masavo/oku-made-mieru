import * as vscode from 'vscode';

export class ConfigurationManager {
	private config: vscode.WorkspaceConfiguration;

	constructor() {
		this.config = vscode.workspace.getConfiguration('okuMadeMieru');
	}

	public updateConfiguration() {
		this.config = vscode.workspace.getConfiguration('okuMadeMieru');
	}

	public isStatusBarEnabled(): boolean {
		return this.config.get('enableStatusBar', true);
	}

	public isHoverEnabled(): boolean {
		return this.config.get('enableHover', true);
	}

	public isOutputChannelEnabled(): boolean {
		return this.config.get('enableOutputChannel', false);
	}
}