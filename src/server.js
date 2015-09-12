/* eslint no-console: 0 */
import express from "express";
import React from "react";
import serialize from "serialize-javascript";
import { navigateAction } from "fluxible-router";
import { createElementWithContext } from "fluxible-addons-react";

import app from "src/app";

import HtmlComponent from "src/components/Html";

// サーバー作成
const server = express();

const htmlFactory = React.createFactory(HtmlComponent);

// 書き出された JavaScript に静的リンクを張る
server.use(express.static("dist"));

// その他のリンクは、サーバーサイドでレンダリングしてから捌く
server.use((req, res, next) => {
  let context = app.createContext();
  // アプリで定義されている URL に移動する
  context.executeAction(navigateAction, { url: req.url }, function (err) {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        next(); // NotFound
      } else {
        next(err); // NotFound 以外のエラーは、内容を表示させる
      }
      // 先には進まない
      return;
    }

    // アプリに登録されている Store に格納されている状態(サーバーサイドでセットされたもの)
    // を吐き出して serialize して、グローバル変数 App に格納する。
    // なお、それをクライアントサイドは読み出し、 Store に登録し直す。
    const exposed = `window.App=${serialize(app.dehydrate(context))};`;
    // サーバーサイドレンダリング
    // state, markup, context は props.(state|markup|context) として Html.jsx にパスされる。
    const html = React.renderToStaticMarkup(htmlFactory({
      state  : exposed,
      markup : React.renderToString(createElementWithContext(context)),
      context: context.getComponentContext()
    }));

    // レスポンス
    res.type("html");
    res.write(`<!DOCTYPE html>${html}`);
    res.end();
  });
});

// サーバー起動
const port = process.env.PORT || 3000;
server.listen(port);
console.log("Listening on port %s...", port);
