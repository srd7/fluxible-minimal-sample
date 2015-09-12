// isomorphic なアプリの入り口
// ここから先は、サバクラ両方から見られる。
import Fluxible from "fluxible";

// HTML コンテンツのコンポーネント
import Application from "src/components/Application";

// ルーティング情報が格納される Store
import RouteStore from "src/stores/RouteStore";
// ページのタイトル(や、その他アプリ全体に関わりそうなもの)が格納される Store
import ApplicationStore from "src/stores/ApplicationStore";

// Fluxible フレームワークをインスタンス化
const app = new Fluxible({
  component: Application,
  stores: [RouteStore, ApplicationStore]
});

export default app;
