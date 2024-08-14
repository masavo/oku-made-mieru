import * as vscode from 'vscode';
import { JapaneseNumberConverter } from './japaneseNumberConverter';

export function activate(context: vscode.ExtensionContext) {
	console.log('拡張機能 "oku-made-mieru" が有効になりました。');

	let disposable = vscode.commands.registerCommand('oku-made-mieru.convertToJapanese', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const converter = new JapaneseNumberConverter();
			const japaneseNumber = converter.convert(text);
			vscode.window.setStatusBarMessage(`日本語表記: ${japaneseNumber}`);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }