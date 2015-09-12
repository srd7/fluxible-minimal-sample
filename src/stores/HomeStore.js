import BaseStore from "fluxible/addons/BaseStore";

// 詳しいコメントは ApplicationStore.jsx 参照
class HomeStore extends BaseStore {
  // 初期化
  constructor(dispatcher) {
    super(dispatcher);
    this.inputValue = "";
  }

  setInputValue(payload) {
    this.inputValue = payload.inputValue;
    this.emitChange();
  }

  getInputValue() {
    return this.inputValue;
  }

  dehydrate() {
    return {
      inputValue: this.inputValue
    };
  }

  rehydrate(state) {
    this.inputValue = state.inputValue;
  }
}

HomeStore.storeName = "HomeStore";
HomeStore.handlers = {
  "SET_INPUT_VALUE": "setInputValue"
};

export default HomeStore;
