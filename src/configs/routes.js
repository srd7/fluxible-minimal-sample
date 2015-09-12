export default {
  home: {
    path: "/",
    method: "get",
    handler: require("src/components/Home"),
    action: (context, payload, done) => {
      context.dispatch("UPDATE_PAGE_TITLE", { pageTitle: "Home" });
      done();
    }
  }
};
