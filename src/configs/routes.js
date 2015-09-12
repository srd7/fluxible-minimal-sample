export default {
  home: {
    path: "/",
    method: "get",
    handler: require("src/components/Home"),
    action: (context, payload, done) => {
      context.dispatch("UPDATE_PAGE_TITLE", { pageTitle: "Home" });
      done();
    }
  },
  mypage: {
    path: "/mypage/:userCode",
    method: "get",
    handler: require("src/components/MyPage"),
    action: (context, payload, done) => {
      const userCode = payload.get("params").get("userCode");
      context.dispatch("UPDATE_PAGE_TITLE", { pageTitle: `${userCode}さんのマイページ`});
      done();
    }
  }
};
