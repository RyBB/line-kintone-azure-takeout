# 動作チェック③-LINE Push Message

まだまだ他にもkintoneにカスタマイズを実装しています。<br/>
次は **kintone×LINE連携** カスタマイズの動作チェックです。<br/>
<br/>
kintoneはデータベースの側面が強いので **どうしてもデータをためる場所** というバックエンドの認識が強いのですが、<br/>
**【フロント常備&JS/CSSによるカスタマイズも可能】** ということでフロントエンドにもなりえます。<br/>
<br/>
今回は、kintone上にボタンを配置して、ボタンクリックでLINEへメッセージを送信するカスタマイズを実装しています。

## 注文決済ステータスに応じたメッセージ送信

**【テイクアウト】決済管理** のアプリを開いて、左側のノートマークを選ぶとデータの詳細画面が開きます。画面上部のヘッダー部分にボタンを自作して埋め込んでいます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vTVqBemqjLpD9ITqFlF_aO5YU5o0rW3mFmd8URybWoLXVGttGjsJrI3NgHzhiweMgSCiqQYG8bjsc0C/pub?w=928&amp;h=628">

このボタンは決済ステータスに応じて変更されるようにJS側で記述しており、

- 決済状況がPAID、かつ引き渡し状況がPREPARING:「商品の準備完了」
- 決済状況がPAID、かつ引き渡し状況がREADY: 「商品の受取完了」
- それ以外: ボタンを表示しない

という分岐をしています。そしてこのボタンを押すことで

- LINEへその時のステータスに応じたメッセージ送信
- kintoneの「引き渡し状況」を次へ進める

<img src="https://docs.google.com/drawings/d/e/2PACX-1vTKyZPvnhuWhiGaly4tJ3zbadHtWUh_RlFskGXLPLbxqcEgx2nkJ72YJZtvbO2sI9_vaFi3NkZ9UlIg/pub?w=945&amp;h=524">
という処理を記述しています。JavaScriptに興味のある方は[GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/paid-script.js)にコード載せてるのでぜひ！

## 問い合わせメッセージへの返信

**【テイクアウト】問い合わせ管理** アプリにもカスタマイズを仕込ませています。kintone上で問い合わせに対して返信メッセージが送信できるようにしてみました！

問い合わせ管理アプリを開いて、左側のノートマークを選ぶとデータの詳細画面が開きます。<br/>
一覧からどれかのデータの一番左のノートアイコンを選択して詳細画面を開きます。<br/>
右側のペンマークを選択することで、データの編集画面に移ります。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSREqPXSxBZZJso1Y-uyaT9BlLiD0voKBVqhMU_r3wL6RyVYU5uwILdwzN_Mr6JUE_-LyuuN0bBgbvT/pub?w=1390&amp;h=742">

メッセージ内容を記載して保存ボタンを選択後「メッセージ送信」ボタンを押すと、LINE宛にメッセージが送信されます。<br/>
<br/>
<br/>
以上でkintoneカスタマイズの動作チェックは完了です！<br/>
双方向でやり取りができるのでとても便利です！！
