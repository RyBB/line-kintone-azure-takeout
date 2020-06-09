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

## 今回のkintoneカスタマイズのコード解説

今回は3つのアプリに対してそれぞれカスタマイズを実装しています。

- 注文管理：グラフの自作 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/charts-script.js)
- 決済管理：自作ボタンで定形LINEメッセージ送信&kintoneのステータス変更 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/paid-script.js)
- 問い合わせ管理：自作ボタンでkintone上に記入したテキストをLINEに送信 [GitHub](https://github.com/RyBB/line-kintone-azure-takeout/blob/master/src/js/sendmsg-script.js)

それぞれGitHubにあげているので気になった方はぜひぜひ！

### グラフの自作

kintone上には以下のHTMLを埋め込んでいます。<br/>

> ※ 参考）https://developer.cybozu.io/hc/ja/articles/202905604

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

今回はサンプルということでグラフの軸などは固定にしていますが、本当は可変できたほうがいいですね。
