import React from "react";

import ApplicationStore from "src/stores/ApplicationStore";

export default class Html extends React.Component {
  // server.js からのみ呼ばれる。
  render() {
    // server.js で state, markup, context がセットされている
    // state  : Store の情報
    // markup : レンダリングされた HTML
    // context: Store を取得(して、ページタイトルを取得)するために必要
    const { state, markup, context } = this.props;
    const title = decodeURI(context.getStore(ApplicationStore).getPageTitle());
    return (
      <html>
        <head>
          <title>{ title }</title>
        </head>
        <body>
          {
            // サーバーサイドでレンダリングされた HTML がここに innerHTML される。
            // クライアントサイドでは、#app が描画の起点となる。
            <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          }
          {
            // サーバー -> クライアント に送られる Store の情報が、
            // グローバル変数 window.App としてここに埋め込まれる。
            // エスケープされたらダメなので innerHTML される。
            <script dangerouslySetInnerHTML={{ __html: state }} />
          }
          {
            // webpack で統合された JavaScript ファイルをロード。
            // 既にサーバーサイドでレンダリングされているため、
            // DOM構築には JavaScript は不必要である。
            // なので、遅延実行する。
            <script src="/main.js" defer />
          }
        </body>
      </html>
    );
  }
}
