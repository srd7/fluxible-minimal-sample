import React, { PropTypes } from "react";
import { navigateAction } from "fluxible-router";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    // handleInputChange, handleKeyDown, handleButtonClick に this をバインドする
    // これをしないと this を取得することができない
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown     = this.handleKeyDown.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.state = { inputValue: "" };
  }

  render() {
    const { inputValue } = this.state;
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
    this.setState({ inputValue: event.target.value });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) { // Enter
      this.handleButtonClick();
    }
  }

  handleButtonClick() {
    // ボタンが押されたら MyPage にジャンプする。
    const { inputValue } = this.state;
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
// これをしないと this.context.executeAction および getStore は undefined になる。
Home.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  getStore     : PropTypes.func.isRequired
};

export default Home;
