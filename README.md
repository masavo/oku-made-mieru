# 億までみえーる (Oku Made Mieru)

![アイコン](resources/icon.png)

https://marketplace.visualstudio.com/items?itemName=masavo.oku-made-mieru

## 概要

「億までみえーる」は、Visual Studio Code 用の拡張機能で、オンマウスした数値を日本語表記(万進法)で表示します。
これにより、非常に大きな数値の理解とが容易になります。

### sample

![sample](resources/sample.png)

## 主な機能

- 選択された数値を日本語表記（無量大数単位まで）に変換
- ステータスバーでの変換結果の表示(設定で ON/OFF 可能)
- ホバー機能による数値の日本語表記の表示(設定で ON/OFF 可能)
- **オンマウスで数値を表示**

## 設定

以下の設定をカスタマイズできます：

- `okuMadeMieru.enableStatusBar`: ステータスバーの表示/非表示を切り替えます。
- `okuMadeMieru.enableHover`: ホバー機能の有効/無効を切り替えます。

設定の変更手順：

1. `Cmd+,`（macOS）または`Ctrl+,`（Windows/Linux）で設定を開きます。
2. 検索バーに「oku made mieru」と入力します。
3. 表示された設定を必要に応じて調整します。

## 使用方法

1. テキストエディタ内で数値を選択します。
2. 選択した数値の日本語表記（無量大数単位まで）がステータスバーに表示されます。
3. 数値にマウスを合わせると、ホバーで日本語表記が表示されます。

## インストール方法

1. VS Code を起動します。
2. 左側のアクティビティバーから拡張機能アイコン（四角形のパズルピース）をクリックします。
3. 検索バーに「億までみえーる」または「Oku Made Mieru」と入力します。
4. 検索結果から「億までみえーる」を見つけ、「インストール」ボタンをクリックします。

## 開発者向け情報

### 環境構築

1. リポジトリのクローン：
   ```
   git clone https://github.com/yourusername/oku-made-mieru.git
   ```
2. プロジェ ��� トディレクトリへの移動：
   ```
   cd oku-made-mieru
   ```
3. 依存パッケージのインストール：
   ```
   npm install
   ```

### ビルドとテスト

- ビルドの実行：
  ```
  npm run compile
  ```
- テストの実行：
  ```
  npm test
  ```
- 開発用
  ```
  npm run watch
  ```

### デバッグ

1. VS Code でプロジェクトを開きます。
2. `F5`キーを押してデバッグを開始します。
3. 新しいウィンドウが開き、拡張機能がロードされます。

### コントリビューション

1. このリポジトリをフォークします。
2. 新しいブランチを作成：`git checkout -b feature/新機能名`
3. 変更を加え、コミット：`git commit -am '新機能の追加: 機能の説明'`
4. ブランチをプッシュ：`git push origin feature/新機能名`
5. プルリクエストを作成します。

## フィードバック

バグ報告や機能リクエストは、GitHub の Issue トラッカーをご利用ください。

## ライセンス

本プロジェクトは MIT ライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。
