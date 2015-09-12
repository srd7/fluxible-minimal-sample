import { RouteStore } from "fluxible-router";
import routes from "src/configs/routes";

// フレームワークの RouteStore に自前のルーティングを登録
export default RouteStore.withStaticRoutes(routes);
