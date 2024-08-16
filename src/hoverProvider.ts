import * as vscode from 'vscode';
import { JapaneseNumberConverter } from './japaneseNumberConverter';
import { StatusBarManager } from './statusBarManager';
import { ConfigurationManager } from './configurationManager';

export class HoverProvider implements vscode.HoverProvider {
	constructor(
		private converter: JapaneseNumberConverter,
		private statusBarManager: StatusBarManager,
		private configManager: ConfigurationManager
	) { }

	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		if (!this.configManager.isHoverEnabled()) {
			return null;
		}

		const range = document.getWordRangeAtPosition(position, /\d[\d_,]*/);
		if (!range) {
			this.statusBarManager.updateContent();
			return null;
		}

		const text = document.getText(range);
		return this.processHoverText(text);
	}

	private processHoverText(text: string): vscode.Hover | null {
		try {
			const numericValue = BigInt(text.replace(/[_,]/g, ''));
			if (numericValue > 9999n) {
				const japaneseNumber = this.converter.convert(text);
				this.statusBarManager.updateContent();
				return new vscode.Hover(`日本語表記: ${japaneseNumber}`);
			} else {
				this.statusBarManager.updateContent();
				return null;
			}
		} catch (error) {
			this.statusBarManager.updateContent();
			return null;
		}
	}
}