import React, { PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";
import HomeAction from "src/actions/HomeAction";
import HomeStore from "src/stores/HomeStore";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    // handleInputChange, handleKeyDown, handleButtonClick に this をバインドする
    // これをしないと this を取得することができない
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown     = this.handleKeyDown.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    // 下で HomeStore から取得したもの
    const { inputValue } = this.props;
    return (
      <div>
        <p>コードを入力してユーザーページに飛ぼう</p>
        <p>
          <input
            type="text"
            value={ inputValue }
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Input User Code"
          />
          <button onClick={this.handleButtonClick} >Go!!</button>
        </p>
      </div>
    );
  }

  handleInputChange(event) {
    // input の変更アクションを実行。
    // それにより HomeAction -> dispatcher -> HomeStore と情報が伝達され、
    // 最終的に input の内容が更新される。
    this.context.executeAction(HomeAction.setInputValue, { inputValue: event.target.value });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) { // Enter
      this.handleButtonClick();
    }
  }

  handleButtonClick() {
    // ボタンが押されたら MyPage にジャンプする。
    const { inputValue } = this.props;
    const userCode = inputValue.trim() || "hoge"; // 空文字はダメなので、デフォルト値として。
    // ちなみに Store は、名前からでも取得できる
    const routeStore = this.context.getStore("RouteStore");
    // 遷移先の URL を取得して
    const url = routeStore.makePath("mypage", { userCode });
    // ページ遷移実行
    this.context.executeAction(navigateAction, { url });
  }
}

// executeAction と getStore を使用できるようにセットする。
// これをしないと this.context.executeAction および this.context.getStore は undefined になる。
Home.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore     : PropTypes.func.isRequired
};

// Home を HomeStore に接続させる
// その内容を this.props から取得できるようにする
export default connectToStores(Home, [HomeStore], (context) => {
  const homeStore = context.getStore(HomeStore);
  return {
    inputValue: homeStore.getInputValue()
  };
});
