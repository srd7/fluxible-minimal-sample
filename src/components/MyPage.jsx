import React from "react";

export default class MyPage extends React.Component {
  render() {
    // Application.jsx で params を投げてるから呼び出せる
    // 日本語の可能性があるので、デコードする
    const userCode = decodeURI(this.props.params.get("userCode"));
    return (
      <p>{ userCode } さんのマイページへようこそ！</p>
    );
  }
}
