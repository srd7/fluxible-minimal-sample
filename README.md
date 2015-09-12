# fluxible-minimal-sample

[fluxible-example/fluxible-router](https://github.com/yahoo/flux-examples/tree/master/fluxible-router)
を参考にしつつ、最小構成(のつもり)でアプリのテンプレを作った。

## 使い方
```
> npm install
> npm run dev
```

Windows なら
```
> npm install
> npm install -g gulp
> gulp dev
```
でもいい。

## 実行順
### サーバーサイド (Node.js)
`src/start.js` ここで `ES6` 有効化などの設定
↓
`src/server.js` サーバーの設定
↓
`src/app.js` 本体

### クライアントサイド
(`webpack.config.js` に設定が書かれている)
↓
`src/client.js` サーバーからのデータを受け取るなど
↓
`src.app.js` 本体

## 大まかなフロー
- [Server] リクエストを Node.js サーバーが受け取る
- [Server] そのリクエストの URL をもとに、HTML がレンダリングされる
- [Server] その際に Store に保存された情報は、グローバル変数 `window.App` に格納され、HTML に埋め込まれる
- [Client] `window.App` から情報を取得し、 Store に格納される

## その他
ソース中のコメントに記載。

## 作成環境
Windows 7 Home Premium 64bit
Node.js v0.12.7
