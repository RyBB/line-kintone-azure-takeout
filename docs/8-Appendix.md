# 付録

そもそもkintoneとは?の部分や、<br/>
今回実装したkintoneカスタマイズの解説などをしています。

## kintoneとは

> kintone（キントーン）は、開発の知識がなくても自社の業務に合わせたシステムをかんたんに作成できる、サイボウズのクラウドサービスです。業務アプリを直感的に作成でき、チーム内で共有して使えます。社員間のつながりを活性化する社内SNSとしての機能も備えているため、スピーディーに情報共有ができます。

*kintoneヘルプ  <https://jp.cybozu.help/k/ja/user/basic/whatskintone.html>*

非エンジニアでも自身の業務に合ったシステムを **自分で** 作ることができるWebシステムとなります。<br/>
kintoneにはあらかじめいくつか機能が搭載されており、

- アプリ（データベース）
- プロセス管理（ワークフロー）
- コメント（コミュニケーション）

など業務に必要な機能が揃っているプラットフォームでもあります。
アプリとコメントが紐付いているため、いわゆるストック型とフロー型を組み合わせたシステムが構築できます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQBdrDAe5G1dOAj3bYx_O4VgqCgJzcJfAhzGd27BjLj0spVvY05mW_0IdPCyB7i5-eWpMhLwOxZxuaV/pub?w=926&amp;h=489">

## kintoneカスタマイズとは

kintoneにはAPIなどの拡張機能があり、ご自身のやりたいことに合わせてカスタマイズすることが可能となっています。<br/>
<br/>
・JavaScriptによる画面カスタマイズ
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQ8JtN6RJusfmCLdgmUIDkxohWpfbu9by2JsVfyVc6vGrwVKDGNAAdt-zclMXjUHOY5rdHkQXMhiAaU/pub?w=929&amp;h=495">
<br/>
・REST APIによるデータ操作
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSWbjzYSUX5RGDVjq5zwdSQufpADG2X-B_knjjNMQ7UV_HG6FptJSSJXBigx7THxBJA6ekBea9Y9Jat/pub?w=928&amp;h=491">
<br/>
・Webhookによるイベント発火
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSugyFnlDGMm1ioXJmSzK7nxNxrx8JzkQaSeqbR3UAKtmSpWXTu52DhRiMSYLIyLdk9hpyvT0avCPod/pub?w=928&amp;h=489">

## cybozu developer network

> https://developer.cybozu.io/hc/ja

APIドキュメントなどkintoneのカスタマイズ情報はこのサイトに全て載っています！
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSArl6xI3C3X4h7U5a8hFxDjQA6atF6IB7GtwqTEVUokSetls9cO6QErnzQ_U-BPEm-jBAVvPRfwE9f/pub?w=1391&amp;h=726">

## 今回のkintoneカスタマイズのコード

今回は3つのアプリに対してそれぞれカスタマイズを実装しています。

- 注文管理：グラフの自作 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/charts-script.js)
- 決済管理：自作ボタンで定形LINEメッセージ送信&kintoneのステータス変更 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/paid-script.js)
- 問い合わせ管理：自作ボタンでkintone上に記入したテキストをLINEに送信 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/sendmsg-script.js)

それぞれGitHubにあげているので気になった方はぜひぜひ！

## 自作グラフの一覧 （カスタマイズビュー）

カスタマイズビューという機能を使ってHTMLをkintone内に記述しています。<br/>

> ※ 参考）https://developer.cybozu.io/hc/ja/articles/202905604

・設定方法<br/>
**【テイクアウト】注文管理** アプリの一覧画面の歯車よりアプリの設定画面を開いてください。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRvfYh9jABgjFdPoKQBotN3WW4Agnlsov_QlHNqKGlCoufPW1XvcRPhj_v4cQBkeST8KRSCh0wKPFie/pub?w=1393&amp;h=728">
この設定画面でアプリのフォームの構成やアクセス権などが設定できます！

一覧タブを選んで、右側の「+ボタン」を選択して一覧を作成します。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRvtqPpkR-Z6xpnFjNnRXoHhTGxgUsgUr_lVAZRcCivFCplueQnCfUJcUcIdOFrRPJIGXgj91m2Ww_i/pub?w=1390&amp;h=736">

一覧名を適当につけて、表示形式を **カスタマイズ** に変更します。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRXd9Eke608tNJy1k97GlnyEuK6L3cQvdxMq30oh2jwhN6QeFans7hB14M2yCSQTfBReJVEXFo1KteE/pub?w=1393&amp;h=726">

下の方にHTMLを記入できる場所があるので、そこに下記のHTMLをコピペで記入してください。

```html
<div class="canvas-box">
  <div class="canvas-box1"><canvas id="myChart1"></canvas></div>
  <div class="canvas-box2"><canvas id="myChart2"></canvas></div>
</div>
<div class="canvas-box">
  <div class="canvas-box3"><canvas id="myChart3"></canvas></div>
  <div class="canvas-box4"><canvas id="myChart4"></canvas></div>
</div>
```

<img src="https://docs.google.com/drawings/d/e/2PACX-1vSFQoBfVZWXXJE8D99c1AVIZR9rNL4F8Ain0zoHGeGDz-zqEu5joJ0WUC-XUmmMJAtYpFTXUOPHrDIX/pub?w=1394&amp;h=723">

一覧の保存後、「アプリを更新」でアプリに反映させます。<font color="red">必ずアプリを更新をしてください！よく忘れます！！</font>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSF88WspbfmfpODDqdmbh0XIpx8a-REc-94kZdJJjx0yu3Z8Ckuazohe-Yx-4rKvEsdhqg2czjoEc3X/pub?w=1390&amp;h=746">
