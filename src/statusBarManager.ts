import * as vscode from 'vscode';
import { ConfigurationManager } from './configurationManager';
import { JapaneseNumberConverter } from './japaneseNumberConverter';

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private converter: JapaneseNumberConverter;

  constructor(private configManager: ConfigurationManager) {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    this.statusBarItem.text = '日本語表記: 準備完了';
    this.updateVisibility();
    this.converter = new JapaneseNumberConverter();
  }

  public updateVisibility() {
    if (this.configManager.isStatusBarEnabled()) {
      this.statusBarItem.show();
    } else {
      this.statusBarItem.hide();
    }
  }

  public updateContent() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      this.updateText('日本語表記: エディタがアクティブではありません');
      return;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
      this.updateText('日本語表記: テキストを選択してください');
      return;
    }

    this.processSelectedText(editor.document.getText(selection));
  }

  private processSelectedText(text: string) {
    try {
      const numericValue = BigInt(text.replace(/[_,]/g, ''));
      if (numericValue > 9999n) {
        const japaneseNumber = this.converter.convert(text);
        this.updateText(`日本語表記: ${japaneseNumber}`);
      } else {
        this.updateText('日本語表記: 4桁以下の数値です');
      }
    } catch (error) {
      this.updateText('日本語表記: 変換できません');
    }
  }

  private updateText(text: string) {
    if (this.configManager.isStatusBarEnabled()) {
      this.statusBarItem.text = text;
    }
  }
}