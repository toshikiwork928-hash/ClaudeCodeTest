/* ============================================================
   DATA.JS — サイトコンテンツの設定ファイル
   このファイルを編集してサイトをカスタマイズしてください。
   ============================================================ */

// ============================================================
// SITE CONFIG — 基本設定
// ============================================================
const CONFIG = {
  // ✏️ あなたの名前
  name: "Your Name",

  // ✏️ ナビゲーション用の短い名前 (ロゴに表示)
  nameShort: "YN",

  // ✏️ ひとことタグライン
  tagline: "Designer · Developer · Photographer",

  // ✏️ 自己紹介文（配列で複数段落）
  bio: [
    "デザイン、写真、コード。日常の断片を記録しています。",
    "Webサイトの設計・開発を中心に、グラフィックデザインや写真撮影なども手がけています。シンプルで本質的なものをつくることを大切にしています。"
  ],

  // ✏️ プロフィール写真のパス（空文字でプレースホルダー表示）
  avatar: "",

  // ✏️ スタッツ（実績数値など。空配列 [] で非表示）
  stats: [
    { number: "40+", label: "Projects" },
    { number: "5yr", label: "Experience" }
  ],

  // ✏️ ソーシャルリンク（URLを空文字にすると非表示）
  social: {
    x:         { url: "https://x.com/yourusername",         label: "X (Twitter)" },
    github:    { url: "https://github.com/yourusername",    label: "GitHub" },
    instagram: { url: "",                                    label: "Instagram" },
    note:      { url: "",                                    label: "note" }
  },

  // ✏️ Xで連絡を受け取るメッセージ
  contactMessage: "お問い合わせはXのDMよりお気軽にどうぞ。",

  // ✏️ X DMのURL（x.comのプロフィールURLを設定）
  contactUrl: "https://x.com/yourusername"
};


// ============================================================
// PORTFOLIO — 制作物の一覧
// ============================================================
// 各フィールドの説明:
//   id:          一意の番号
//   title:       作品タイトル
//   category:    カテゴリ（フィルターに使用）
//   tags:        タグ配列
//   description: 短い説明文
//   image:       画像URL or 相対パス（空文字でプレースホルダー）
//   link:        作品リンク（なければ "#"）
//   featured:    true = トップページに表示
//   year:        制作年

const PORTFOLIO = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Web",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "シンプルで洗練されたポートフォリオサイト。レスポンシブ対応、モノトーンデザイン。",
    image: "https://picsum.photos/seed/pf1/800/600",
    link: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Design",
    tags: ["Branding", "Logo", "Typography"],
    description: "新規ブランドのビジュアルアイデンティティを一から設計。ロゴ・名刺・ウェブ展開まで。",
    image: "https://picsum.photos/seed/pf2/800/600",
    link: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 3,
    title: "Urban Photography Series",
    category: "Photo",
    tags: ["Photography", "Urban", "Editing"],
    description: "都市の断片を切り取った写真シリーズ。光と影の対比をテーマに。",
    image: "https://picsum.photos/seed/pf3/800/600",
    link: "#",
    featured: true,
    year: "2024"
  },
  {
    id: 4,
    title: "Mobile App UI",
    category: "Design",
    tags: ["UI/UX", "Figma", "Mobile"],
    description: "ライフログアプリのUIデザイン。直感的な操作性とミニマルなビジュアルを両立。",
    image: "https://picsum.photos/seed/pf4/800/600",
    link: "#",
    featured: false,
    year: "2024"
  },
  {
    id: 5,
    title: "E-commerce Frontend",
    category: "Web",
    tags: ["React", "CSS", "API"],
    description: "アパレルブランドのECサイトフロントエンド開発。パフォーマンス最適化を重視。",
    image: "https://picsum.photos/seed/pf5/800/600",
    link: "#",
    featured: false,
    year: "2023"
  },
  {
    id: 6,
    title: "Editorial Layout",
    category: "Design",
    tags: ["Print", "Layout", "InDesign"],
    description: "雑誌・冊子のエディトリアルデザイン。読みやすさと視覚的な美しさを追求。",
    image: "https://picsum.photos/seed/pf6/800/600",
    link: "#",
    featured: false,
    year: "2023"
  },
  {
    id: 7,
    title: "Dashboard Interface",
    category: "Web",
    tags: ["Vue.js", "Data Viz", "UI"],
    description: "データ可視化ダッシュボード。複雑な情報をシンプルに伝えるレイアウト設計。",
    image: "https://picsum.photos/seed/pf7/800/600",
    link: "#",
    featured: false,
    year: "2023"
  },
  {
    id: 8,
    title: "Still Life Series",
    category: "Photo",
    tags: ["Photography", "Still Life"],
    description: "静物写真シリーズ。素材の質感と光の当たり方にこだわった作品群。",
    image: "https://picsum.photos/seed/pf8/800/600",
    link: "#",
    featured: false,
    year: "2022"
  }
];


// ============================================================
// DIARY — 日記エントリー
// ============================================================
// 各フィールドの説明:
//   id:      一意の番号
//   title:   タイトル
//   date:    日付 "YYYY-MM-DD" 形式
//   tags:    タグ配列
//   cover:   カバー画像URL（空文字で非表示）
//   content: HTML形式の本文

const DIARY = [
  {
    id: 1,
    title: "はじめての記録",
    date: "2024-03-15",
    tags: ["日常", "ノート"],
    cover: "https://picsum.photos/seed/dv1/1200/630",
    content: `
      <p>このサイトを作りました。しばらくここに日常の断片を記録していこうと思います。</p>
      <p>大きな出来事でなくていい。小さな発見、気づき、感じたこと。そういうものを少しずつ書き留めていきたい。</p>
      <h2>なぜ書くか</h2>
      <p>記録することで、自分の思考が整理される気がしています。書かないと流れていってしまうものを、文字にすることで少し手元に留めておける。</p>
      <p>読み返したときに、あのころ自分はこんなことを考えていたんだと気づける。そのためのアーカイブです。</p>
    `
  },
  {
    id: 2,
    title: "カメラを持って街を歩いた",
    date: "2024-03-22",
    tags: ["写真", "散歩"],
    cover: "https://picsum.photos/seed/dv2/1200/630",
    content: `
      <p>久しぶりにカメラを持って近所を歩いた。普段見ているはずの場所が、ファインダー越しに見るとちがって見える。</p>
      <p>電柱の影、古いビルの窓、工事中の足場。何でもないものが、光の角度によって面白い形になる。</p>
      <blockquote>写真を撮ることは、見ることの訓練だと思う。</blockquote>
      <p>今日撮った写真を整理したら、ギャラリーに追加しようと思う。ちゃんと記録として残しておきたい。</p>
    `
  },
  {
    id: 3,
    title: "デザインについて考えたこと",
    date: "2024-04-03",
    tags: ["デザイン", "思考"],
    cover: "",
    content: `
      <p>デザインとは何かをまた考えている。ビジュアルの話だけじゃなく、構造の話、コミュニケーションの話。</p>
      <p>最近、余白の重要性を改めて感じている。何かを追加するより、何かを取り除くほうが難しい。</p>
      <h2>引き算の思考</h2>
      <p>必要なものだけを残す。それ以外を削ぎ落とす。簡単なようで、「何が必要か」を判断することは難しい。</p>
      <p>しばらくはこの問いと向き合ってみようと思う。答えはすぐには出ないだろうけれど、考え続けることに意味があると信じている。</p>
    `
  },
  {
    id: 4,
    title: "好きなフォントの話",
    date: "2024-04-18",
    tags: ["タイポグラフィ", "デザイン"],
    cover: "https://picsum.photos/seed/dv4/1200/630",
    content: `
      <p>最近また書体への興味が戻ってきた。ひとつのフォントファミリーを深掘りしていくと、その背景にある歴史や思想が見えてきて面白い。</p>
      <p>今のお気に入りは Space Grotesk。幾何学的でありながら、どこか人間的な温かみがある。コーナーの処理が微妙に揃っていない部分が、機械的になりすぎない理由だと思う。</p>
      <h2>書体は声</h2>
      <p>どの書体を選ぶかは、どんな声で話すかを決めることに似ている。同じ言葉でも、書体が変わると印象がまったく変わる。</p>
      <p>これからも書体への感度を高めていきたい。</p>
    `
  },
  {
    id: 5,
    title: "季節の変わり目に",
    date: "2024-05-01",
    tags: ["日常"],
    cover: "https://picsum.photos/seed/dv5/1200/630",
    content: `
      <p>気がつけば五月になっていた。窓を開けると、空気がずいぶん柔らかくなっている。</p>
      <p>季節の変わり目は、なぜか気持ちが動きやすい。新しいことをはじめたくなったり、逆に立ち止まりたくなったり。</p>
      <p>今月は少し自分のペースを取り戻す月にしようと思っている。焦らず、でも止まらずに。</p>
    `
  }
];


// ============================================================
// GALLERY — フォトギャラリー
// ============================================================
// 各フィールドの説明:
//   id:       一意の番号
//   src:      画像URL or 相対パス
//   caption:  キャプション（空文字で非表示）
//   category: カテゴリ（将来のフィルター用）

const GALLERY = [
  { id: 1,  src: "https://picsum.photos/seed/gl1/600/800",  caption: "都市の断片 #1",  category: "Urban"    },
  { id: 2,  src: "https://picsum.photos/seed/gl2/900/600",  caption: "光と影",          category: "Abstract" },
  { id: 3,  src: "https://picsum.photos/seed/gl3/700/700",  caption: "",                category: "Urban"    },
  { id: 4,  src: "https://picsum.photos/seed/gl4/600/900",  caption: "空",              category: "Nature"   },
  { id: 5,  src: "https://picsum.photos/seed/gl5/900/600",  caption: "街角の朝",        category: "Urban"    },
  { id: 6,  src: "https://picsum.photos/seed/gl6/700/500",  caption: "静物",            category: "Still"    },
  { id: 7,  src: "https://picsum.photos/seed/gl7/600/800",  caption: "",                category: "Abstract" },
  { id: 8,  src: "https://picsum.photos/seed/gl8/800/600",  caption: "夕暮れ",          category: "Nature"   },
  { id: 9,  src: "https://picsum.photos/seed/gl9/700/900",  caption: "路地",            category: "Urban"    },
  { id: 10, src: "https://picsum.photos/seed/gl10/800/600", caption: "",                category: "Abstract" },
  { id: 11, src: "https://picsum.photos/seed/gl11/600/600", caption: "朝の光",          category: "Nature"   },
  { id: 12, src: "https://picsum.photos/seed/gl12/900/700", caption: "建築",            category: "Urban"    },
  { id: 13, src: "https://picsum.photos/seed/gl13/600/800", caption: "",                category: "Still"    },
  { id: 14, src: "https://picsum.photos/seed/gl14/800/500", caption: "夜の街",          category: "Urban"    },
  { id: 15, src: "https://picsum.photos/seed/gl15/700/700", caption: "",                category: "Abstract" }
];
