import React from "react";
import { handleHistory } from "fluxible-router";
import { connectToStores } from "fluxible-addons-react";
import ApplicationStore from "src/stores/ApplicationStore";
import Header from "src/components/Header";

class Application extends React.Component {
  componentDidUpdate(prevProps) {
    // 下で Store から pageTitle を取得できるようにしている
    const prevPageTitle = prevProps.pageTitle;
    const newPageTitle  = this.props.pageTitle;

    // タイトルを再設定
    if (prevPageTitle !== newPageTitle) {
      document.title = newPageTitle;
    }
  }
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

// currentRoute を得るのに handleHistory が必要
// また、タイトル取得のために ApplicationStore に接続する
export default handleHistory(connectToStores(Application, [ApplicationStore], (context) => {
  const applicationStore = context.getStore(ApplicationStore);
  // これで props.pageTitle が格納される
  return {
    pageTitle: applicationStore.getPageTitle()
  };
}));
