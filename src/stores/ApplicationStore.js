import BaseStore from "fluxible/addons/BaseStore";

class ApplicationStore extends BaseStore {
  // 初期化
  constructor(dispatcher) {
    super(dispatcher);
    this.pageTitle = "";
  }
  updatePageTitle(payload) {
    // Store の情報を更新して、
    this.pageTitle = payload.pageTitle;
    // DOM を更新
    this.emitChange();
  }
  getPageTitle() {
    return this.pageTitle;
  }

  // Store の情報を全部出す。
  // サーバーサイドからクライアントサイドに送るため。
  dehydrate() {
    return {
      pageTitle: this.pageTitle
    };
  }
  // Store に情報を格納する。
  // サーバーサイドから送られた情報をクライアントサイドでセットするため。
  rehydrate(state) {
    this.pageTitle = state.pageTitle;
  }
}

// Store 名を登録。minify されても識別できるように。
ApplicationStore.storeName = "ApplicationStore";
// dispatcher からメッセージが投げられるが、
// この Store が反応するべきメッセージを登録しておく。
// message -> method
// と、メッセージに対して呼び出す関数をセット。
ApplicationStore.handlers = {
  "UPDATE_PAGE_TITLE": "updatePageTitle"
};

export default ApplicationStore;
