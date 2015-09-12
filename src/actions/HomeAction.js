export default {
  // input を更新する
  setInputValue(context, payload, done) {
    context.dispatch("SET_INPUT_VALUE", payload);
    done();
  }
};
