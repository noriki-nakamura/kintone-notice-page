# Kintone Notice Site (Astro + Amplify)

Kintoneをお知らせのCMSとして利用し、AWS Amplifyでホスティングする静的サイトプロジェクトです。

## 🛠 Kintoneアプリの設定

Kintoneで以下のフィールドを持つアプリを作成してください。

| フィールド名 | フィールドコード | 型 | 備考 |
| --- | --- | --- | --- |
| タイトル | `title` | 文字列 (1行) |  |
| 本文 | `content` | リッチエディタ |  |
| カテゴリ | `category` | ドロップダウン / ラジオボタン | 例: `ニュース`, `メンテナンス`, `プレスリリース` |
| 公開日 | `publishedAt` | 日付 |  |

APIトークンを発行し、以下の権限を付与してください：
- **レコード閲覧**

## 🚀 AWS Amplify Hosting の設定

### 1. アプリケーションの接続
GitHub等のリポジトリにこのコードをプッシュし、AWS Amplify Hosting コンソールから「ホスティングを開始」を選択してリポジトリを接続します。

### 2. ビルド設定 (amplify.yml)
Astroの自動検出設定で基本的には動作しますが、必要に応じて以下を確認してください。
- **Build command**: `npm run build`
- **Output directory**: `dist`

### 3. 環境変数の設定
Amplifyコンソールの「環境変数」セクションで以下を設定します。

| キー | 値の例 | 説明 |
| --- | --- | --- |
| `KINTONE_BASE_URL` | `https://your-domain.cybozu.com` | KintoneのベースURL |
| `KINTONE_APP_ID` | `123` | お知らせアプリのID |
| `KINTONE_API_TOKEN` | `xxxxxxxxxxxx` | 発行したAPIトークン |
| `GOOGLE_CALENDAR_EMBED_URL` | `https://calendar.google.com/calendar/embed?...` | (任意) Googleカレンダー埋め込みURL |

### 4. Build Webhook の設定 (自動再ビルド)
Kintoneで記事が更新されたら自動的にサイトを再構築するための設定です。

1. Amplifyコンソールの「アプリの設定」>「ビルドの設定」>「Incoming webhooks」を開きます。
2. 「Webhookを作成」をクリックし、名前（例: `KintoneUpdate`）を付けて保存します。
3. 生成された **Webhook URL** をコピーします。

## 🔗 Kintone Webhook の設定

1. Kintoneアプリの設定画面を開き、「設定」タブ > 「カスタマイズ/サービス連携」> 「Webhook」を選択します。
2. 「追加」をクリックします。
3. **Webhook URL**: AmplifyでコピーしたURLを貼り付けます。
4. **通知を送信する条件**:
   - レコードの追加
   - レコードの編集
   - レコードの削除
   - (必要に応じて「ステータスの更新」など)
5. 「保存」し、アプリを更新します。

これで、Kintoneでお知らせを更新すると、Amplifyが自動的にビルドを開始し、最新のお知らせサイトが公開されます。

## 💻 ローカル開発

```bash
# 依存関係のインストール
npm install

# 環境変数の設定 (.env ファイルを作成)
# KINTONE_BASE_URL=...
# KINTONE_API_TOKEN=...
# KINTONE_APP_ID=...
# GOOGLE_CALENDAR_EMBED_URL=...

# 開発サーバー起動
npm run dev
```
