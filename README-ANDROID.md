# Drone Taxi — Android アプリ版（Capacitor）

ブラウザ用のゲーム（`www/index.html`）を Capacitor で WebView に同梱し、
Android アプリ（APK / AAB）としてビルドするためのプロジェクトです。
ゲーム本体は完全オフラインで動作し、サーバーは不要です。

- 画面は **横向き（landscape）固定**前提でレイアウトしています。
- ゲームのロジック・絵・音・ステージはすべて `www/index.html` の中にあります。
  ステージ追加などの更新は `www/index.html` を編集し、`npx cap sync` で反映するだけです。

---

## 必要なもの（お手元の環境）

- Node.js 18+ / npm
- Android Studio（Android SDK 同梱）
- JDK 17（Android Studio 同梱のものでOK）

---

## 初回セットアップ

```bash
# 依存をインストール
npm install

# Android プラットフォームを追加（android/ が生成される）
npx cap add android

# www/ の内容をネイティブ側へ同期
npx cap sync
```

### 横向き固定の設定（初回のみ）
`npx cap add android` 後、`android/app/src/main/AndroidManifest.xml` の
`<activity ... android:name=".MainActivity">` に次を追加してください：

```xml
android:screenOrientation="sensorLandscape"
```

（例）
```xml
<activity
    android:name=".MainActivity"
    android:screenOrientation="sensorLandscape"
    android:exported="true"
    ... >
```

> 補足: Web 側でも縦持ち時に「横にしてね」オーバーレイを表示するので、
> Manifest 設定を入れ忘れても遊べますが、ストア配信時は設定推奨です。

---

## ビルド／実行

```bash
# Android Studio で開く
npx cap open android
```

Android Studio で：

- **実機 / エミュレータで実行**: ▶ Run
- **デバッグ APK**: Build → Build Bundle(s) / APK(s) → Build APK(s)
  - 出力: `android/app/build/outputs/apk/debug/app-debug.apk`
- **リリース AAB（ストア提出用）**: Build → Generate Signed Bundle / APK
  - 署名鍵（keystore）の作成が必要です。

---

## ゲームを更新したいとき（ステージ追加など）

1. `www/index.html` を編集（このリポジトリ側で対応できます）
2. 反映してビルドし直す：

```bash
npx cap sync
npx cap open android   # そのまま Run / Build
```

ストアに更新を出す場合は `android/app/build.gradle` の
`versionCode` / `versionName` を上げてから署名ビルドしてください。

---

## アイコン / スプラッシュ（任意）

`@capacitor/assets` を使うと一括生成できます：

```bash
npm i -D @capacitor/assets
# resources/icon.png (1024x1024) と resources/splash.png (2732x2732) を用意して
npx capacitor-assets generate --android
```

---

## ブラウザでの確認

`www/index.html` はそのままブラウザでも動きます（マウス操作対応）。
横向きレイアウトのため、PC では横長ウィンドウで確認してください。
