import * as vscode from 'vscode';
import { JapaneseNumberConverter } from './japaneseNumberConverter';
import { StatusBarManager } from './statusBarManager';
import { OutputChannelManager } from './outputChannelManager';
import { HoverProvider } from './hoverProvider';
import { ConfigurationManager } from './configurationManager';

export function activate(context: vscode.ExtensionContext) {
  try {
    const configManager = new ConfigurationManager();
    const outputChannelManager = new OutputChannelManager("億までミエール", configManager);
    outputChannelManager.log('拡張機能 "oku-made-mieru" が有効になりました。');

    const converter = new JapaneseNumberConverter();
    const statusBarManager = new StatusBarManager(configManager);
    const hoverProvider = new HoverProvider(converter, statusBarManager, configManager);

    registerEventListeners(context, statusBarManager, configManager);
    registerHoverProvider(context, hoverProvider);

    statusBarManager.updateContent();
  } catch (error) {
    handleActivationError(error);
  }
}

function registerEventListeners(
  context: vscode.ExtensionContext,
  statusBarManager: StatusBarManager,
  configManager: ConfigurationManager
) {
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(() => statusBarManager.updateContent()),
    vscode.window.onDidChangeActiveTextEditor(() => statusBarManager.updateContent()),
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('okuMadeMieru')) {
        configManager.updateConfiguration();
        statusBarManager.updateVisibility();
        statusBarManager.updateContent();
      }
    })
  );
}

function registerHoverProvider(context: vscode.ExtensionContext, hoverProvider: HoverProvider) {
  const disposable = vscode.languages.registerHoverProvider('*', hoverProvider);
  context.subscriptions.push(disposable);
}

function handleActivationError(error: unknown) {
  console.error('拡張機能のアクティベーション中にエラーが発生しました:', error);
  vscode.window.showErrorMessage(`拡張機能のアクティベーションエラー: ${error}`);
}

export function deactivate() { }