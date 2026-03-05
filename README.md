# Portfolio Website

シンプルでスタイリッシュなポートフォリオサイトです。
モノトーン・シャープデザイン、レスポンシブ対応。

## ページ構成

| ページ | ファイル | 内容 |
|---|---|---|
| ホーム | `index.html` | 自己紹介、注目作品、最新日記、SNSリンク |
| ポートフォリオ | `portfolio.html` | 制作物一覧（カテゴリフィルター付き） |
| 日記 | `diary.html` | 日記一覧（スライドパネルで全文表示） |
| ギャラリー | `gallery.html` | フォトギャラリー（ライトボックス付き） |

## カスタマイズ方法

**`assets/js/data.js`** を編集するだけでサイトの内容を変更できます。

### 基本設定
```javascript
const CONFIG = {
  name: "Your Name",          // 名前
  tagline: "Designer · ...",  // タグライン
  bio: ["自己紹介文1", "自己紹介文2"],
  social: {
    x:      { url: "https://x.com/yourusername", label: "X (Twitter)" },
    github: { url: "https://github.com/yourusername", label: "GitHub" },
    // URLを空文字にすると非表示
  },
  contactUrl: "https://x.com/yourusername"
};
```

### ポートフォリオを追加する
```javascript
const PORTFOLIO = [
  {
    id: 9,                              // 他と被らない番号
    title: "新しいプロジェクト",
    category: "Web",                    // フィルターに使用
    tags: ["HTML", "CSS"],
    description: "説明文",
    image: "assets/images/mywork.jpg",  // または画像URL
    link: "https://example.com",
    featured: true,                     // トップページに表示するか
    year: "2025"
  },
];
```

### 日記を追加する
```javascript
const DIARY = [
  {
    id: 6,
    title: "今日のタイトル",
    date: "2025-03-01",                 // YYYY-MM-DD形式
    tags: ["日常"],
    cover: "assets/images/cover.jpg",   // カバー画像（省略可）
    content: `<p>本文をHTMLで書く。</p>`
  },
];
```

### ギャラリーに写真を追加する
```javascript
const GALLERY = [
  {
    id: 16,
    src: "assets/images/photo.jpg",
    caption: "キャプション",
    category: "Urban"
  },
];
```

## ファイル構成

```
/
├── index.html          ホームページ
├── portfolio.html      ポートフォリオ
├── diary.html          日記
├── gallery.html        ギャラリー
├── assets/
│   ├── css/style.css   スタイルシート
│   ├── js/
│   │   ├── data.js     コンテンツデータ（ここを編集）
│   │   └── app.js      アプリケーションロジック
│   └── images/         画像ファイルをここに置く
└── README.md
```

## デプロイ

静的ファイルのみで構成されているため、GitHub Pages などにそのままデプロイ可能です。
