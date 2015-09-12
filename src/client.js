import React from "react";
import { createElementWithContext } from "fluxible-addons-react";
import app from "src/app";

// サーバーサイドで Store に格納された情報は、
// グローバル変数 window.App を通じてクライアントにトスされる。
// その状態を取得
const dehydratedState = window.App;

// その状態をクライアントサイドのアプリに登録
app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  // レンダリング
  const mountNode = document.getElementById("app");
  React.render(createElementWithContext(context), mountNode);
});
