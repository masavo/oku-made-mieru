import * as vscode from 'vscode';
import { JapaneseNumberConverter } from './japaneseNumberConverter';

export function activate(context: vscode.ExtensionContext) {
	console.log('拡張機能 "oku-made-mieru" が有効になりました。');

	const converter = new JapaneseNumberConverter();

	// ステータスバーアイテムの作成
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	statusBarItem.text = '日本語表記: 準備完了';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// コマンドの登録
	let disposable = vscode.commands.registerCommand('oku-made-mieru.convertToJapanese', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection);
			const japaneseNumber = converter.convert(text);
			statusBarItem.text = `日本語表記: ${japaneseNumber}`;
			vscode.window.showInformationMessage(`日本語表記: ${japaneseNumber}`);
		}
	});

	context.subscriptions.push(disposable);

	// ホバープロバイダーの登録
	const hoverProvider = vscode.languages.registerHoverProvider('*', {
		provideHover(document, position, token) {
			const range = document.getWordRangeAtPosition(position, /\d[\d_,]*/);
			if (range) {
				const text = document.getText(range);
				try {
					const japaneseNumber = converter.convert(text);
					statusBarItem.text = `日本語表記: ${japaneseNumber}`;
					return new vscode.Hover(`日本語表記: ${japaneseNumber}`);
				} catch (error) {
					statusBarItem.text = '日本語表記: 変換できません';
					return null;
				}
			}
			statusBarItem.text = '日本語表記: 数値にホバーしてください';
			return null;
		}
	});

	context.subscriptions.push(hoverProvider);

	// エディタの選択変更イベントの監視
	vscode.window.onDidChangeTextEditorSelection((event) => {
		const editor = event.textEditor;
		const selection = editor.selection;
		if (!selection.isEmpty) {
			const text = editor.document.getText(selection);
			try {
				const japaneseNumber = converter.convert(text);
				statusBarItem.text = `日本語表記: ${japaneseNumber}`;
			} catch (error) {
				statusBarItem.text = '日本語表記: 変換できません';
			}
		} else {
			statusBarItem.text = '日本語表記: テキストを選択してください';
		}
	}, null, context.subscriptions);
}

export function deactivate() { }