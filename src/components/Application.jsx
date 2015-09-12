import React from "react";

import { handleHistory } from "fluxible-router";

import Header from "src/components/Header";

class Application extends React.Component {
  render() {
    // ルーティングからコンテンツ本体を取得
    const { currentRoute } = this.props;
    // HTML 内容
    const Handler = currentRoute.get("handler");
    // ルーティングパラメータ。必須ではないが、あると絶対便利なので下に投げる。
    const params  = currentRoute.get("params");
    return (
      <div>
        <Header />
        <Handler params={params} />
      </div>
    );
  }
}

// currentRoute を得るのに必要
export default handleHistory(Application);
