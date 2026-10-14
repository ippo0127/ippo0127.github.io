# 研究用サイト（Ippo Orii）

折井 一歩の個人研究サイト。Hugo で生成し、GitHub Pages（https://ippo0127.github.io/）で公開する。
英語版（`/`）と日本語版（`/ja/`）を同じリポジトリで管理している。

## どこを編集するか

| 更新内容 | 編集するファイル |
|---|---|
| 論文・論文コメント | `data/papers.yaml`（コメントは各論文の `comment` / `comment_ja`。Research の論文一覧で (Comment) を押すと開く） |
| 講演 | `data/talks.yaml`（`selected:` = Selected talks / 主な講演、`other:` = Other talks / その他の口頭発表） |
| ポスター発表 | `data/posters.yaml` |
| 受賞 | `data/awards.yaml` |
| 自己紹介（About） | `content/_index.en.md`, `content/_index.ja.md` |
| 学位論文・Research ページの見出し | `content/research.en.md`, `content/research.ja.md` |
| 経歴（CV） | `content/cv.en.md`, `content/cv.ja.md` |
| スライドなどの PDF | `static/files/`（`static/files/a.pdf` → `/files/a.pdf` で公開される） |
| 写真 | `static/images/profile.jpg` |
| メールアドレス・写真のパス | `hugo.toml` の `[params]` |
| 色・フォント・レイアウト | `assets/css/style.css`, `layouts/` |

- `data/*.yaml` の項目は英語版・日本語版の両方に自動で表示される。
- `content/` のページは言語ごとに別ファイルなので、**英語版と日本語版の両方を更新する**。訳文を作ったときはユーザーに確認してもらう。

## data/*.yaml の書き方

- ファイルに書いた順に表示される。新しい項目は先頭に足す。
- 日本語ページで表記を変えたい項目には `<キー>_ja` を足す（例: `event_ja: 信州大学物質基礎セミナー`）。なければ英語の表記が両方に出る。
- 日付は `YYYY-MM`（例: `2026-07`）。表示は両言語とも "July 2026"。
- arXiv 番号は必ず引用符で囲む（`arxiv: "2601.09067"`）。囲まないと数値として読まれ、ビルドがエラーで止まる。
- 資料のリンクは `slides` / `draft` / `poster` / `video`。日本語でした講演は `in_japanese: true`（英語ページにだけ "(Japanese)" と出る）。
- 使えるキーの一覧は各ファイルの先頭のコメントにある。

## 書式のルール（サイト全体で揃える）

- 講演・ポスター・受賞の1行は「会の名前, 場所, 年月, “タイトル” (資料)」の形にテンプレートが組み立てる。data には各項目の中身だけを書く。
- 場所は都市名だけ（`Kyoto`, `Oxford`）。オンラインは `Online`。
- タイトルは sentence case（文頭と固有名詞だけ大文字）。論文タイトルは arXiv の表記どおりにする。
- 次元は `(2+1)D`。2人の名前が並ぶ用語は en dash でつなぐ（`Chern–Simons`, `Reshetikhin–Turaev`）。日本語の題の副題は `〜` で囲む。
- 共著者はテンプレートが「with A and B」（3人以上なら「with A, B, and C」）の形にする。`arXiv:` の表記もテンプレートが付ける。
- 経歴（CV）は新しいものを上に書く。期間は英語版が `April 2024–March 2026`（en dash）、日本語版が `2024年4月〜2026年3月`。
- 日本語の文章は「，」「．」で区切る（論文コメントに合わせる）。ラベルの後ろは全角の「：」。
- 自己紹介は「**ラベル**: 内容」の形で1行ずつ書く（日本語版は「**ラベル**：内容」）。
- 資料の PDF は `static/files/` に `YYYY-MM-<会の短い名前>-slides.pdf`（原稿は `-draft.pdf`、ポスターは `-poster.pdf`）という名前で置き、data には `/files/<ファイル名>` と書く。Google Drive や研究会のサイトなど、外部の場所にだけ置くことはしない（スライド・原稿・ポスターはすべてここで管理する）。

## 数式

- LaTeX と同じく `$...$`（文中）と `$$...$$`（別行）で書くと、ビルド時に KaTeX で論文と同じ見た目に変換される。`content/*.md` の本文、`data/*.yaml` の `title`、論文コメント（`comment` / `comment_ja`）で使える。
  - 例: `$H^3$`, `$\mathbb{Z}_2$`, `$8\times 10^{53}$`, `$S^1$`, `$\mathbb{RP}^2$`, `pin$^-$`
- `data/*.yaml` で数式を含むタイトルは `'...'`（シングルクォート）で囲む（`\` をそのまま書ける）。
- `\[...\]` や `\(...\)` は数式として扱わない（論文コメント中の `\[1805.02738\]` は角括弧を表示するための書き方）。
- `$` は数式以外に使わない。数式の書き間違い（未対応のコマンドや `$` の閉じ忘れ）があるとビルドがエラーで止まる。
- KaTeX の CSS とフォント（woff2）は `static/katex/` に同梱していて、数式のあるページだけ読み込む（`layouts/_partials/head.html`）。外部サービスには頼っていない。
- KaTeX のバージョン（今は 0.18.4）は Hugo 内蔵の KaTeX に揃える。Hugo を更新したら、Hugo の `internal/warpc/js/package.json` で KaTeX のバージョンを確認し、違っていれば `static/katex/` の CSS・フォントと `head.html` の `?v=` を同じバージョンに入れ替える。

## 確認と公開

1. `hugo --logLevel warn` で警告・エラーが出ないことを確認する。
2. `hugo server` → http://localhost:1313/（日本語版は /ja/）で、変更したページを英語・日本語の両方で見る。
3. `main` ブランチに push すると GitHub Actions（`.github/workflows/hugo.yml`）がビルドして公開する（1〜2分）。ユーザーに頼まれた変更は、確認を待たずに commit・push して公開まで済ませてよい（2026-10-15 にユーザーが了承）。AI が書いた訳文などは、公開後の報告で中身を示して確認してもらう。

- Hugo を更新したら、`.github/workflows/hugo.yml` の `HUGO_VERSION` を手元の `hugo version` に揃える。
- Claude デスクトップアプリのプレビュー（`.claude/launch.json` の `hugo`）が起動しないときは、macOS が hugo の「書類」フォルダへのアクセスを止めている。システム設定で hugo にアクセスを許可してもらうか、`hugo -d <一時フォルダ>` でビルドしたものを確認する。

## 構成

- Hugo v0.168。新しいテンプレート構成（`layouts/baseof.html`, `home.html`, `page.html`, `_partials/`, `_shortcodes/`）で、外部テーマは使っていない。
- Research ページのリストは shortcode（`{{< papers >}}`, `{{< talks selected >}}`, `{{< posters >}}`, `{{< awards >}}`）が `data/` から作る。1行の表示形式は `layouts/_partials/event-item.html` と `layouts/_shortcodes/papers.html` で決まる。
- ラベルの訳（Slides / スライド など）は `i18n/en.yaml`, `i18n/ja.yaml`。
- デザインは本人の Beamer スライドと LaTeX ポスターに合わせたモノクロ基調（`assets/css/style.css` の先頭に説明あり）。ページの見出しはスライドのフレームタイトル風のグレーの帯。本文の `##` 見出しごとに、`layouts/page.html` がポスターのブロック（黒い見出し帯＋黒枠）で囲む。トップページは、ポスターの見出し部分のように名前と所属をヘッダーの太い罫線の間に置く（`layouts/_partials/header.html`）。
- フォントは論文と同じ Latin Modern Roman（LaTeX の `lmodern`。大きい見出しは 17pt 用の `lmroman17`）。MacTeX から `static/fonts/` に同梱していて、外部のフォントサービスは使っていない。日本語の文字は OS の明朝体で表示される。数式は KaTeX（Computer Modern）。
- 論文コメントは `layouts/_shortcodes/papers.html` が Markdown として描画する（`.RenderString`）。開閉は `assets/js/comments.js` で、Research ページにだけ読み込む。JavaScript が使えない環境では、コメントは開いたまま表示される。特定の論文のコメントを開いた状態で見せるリンクは `/research/#arxiv-<arXiv番号>`（日本語版は `/ja/research/#arxiv-<arXiv番号>`）。
- 数式の変換は、Markdown（論文コメントを含む）が `layouts/_markup/render-passthrough.html`、`data/` のタイトルが `layouts/_partials/math-text.html`（どちらも Hugo の `transform.ToMath`）。
