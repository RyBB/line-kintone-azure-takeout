# 動作チェック②-グラフ

kintoneの便利機能についてプチハンズオンをします！

## グラフ作成

kintoneには標準でグラフを作成する機能があります。今回は **【テイクアウト】注文管理** に対して

- 商品別の注文数

を棒グラフで作成してみます。アプリの一覧画面のアイコンからグラフ作成画面を開き、
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRbqt_qxBBg-F_y4xqe_IdU6sM1BkEs8ECKozMlgQ8Y05Y-oqTsVpymsyCOuH7FCC_m-kMCZWtRl-ym/pub?w=1389&amp;h=729">

**縦棒グラフ** を選択して、項目を選んでいきます。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSo6j3o24eMZWZDTV-Px8CG_sOTxwGRYuLuzdnTLQUsKVLFvpxOkxzep4ogXp1k4-HWEpfHdLoMTDfr/pub?w=921&amp;h=491">
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSE75_JEhEbRNhqyf2JTyRhyLxvQ6X6d_DHl_s84LdKBPg5oZFYfb2vFiYLKf3fMKb2iLBeHfL_G1tw/pub?w=929&amp;h=491">

あとは適用ボタンを押せば完成！<br/>
他にも **折れ線グラフ** で売上の推移を表示したり、**円グラフ** で商品の割合を表示したりできます。

### カスタマイズによるグラフの自作

標準の機能によるグラフ作成以外にも **JavaScript/CSSを駆使してグラフを自作** することもできます！これが結構すごい！<br/>
kintone上にHTMLが書ける「カスタマイズビュー」という機能があり、それとJavaScript/CSSを使えば自由にWeb画面を作ることができます。<br/>

実はみなさんに配布しているアプリテンプレートにはすでにJavaScript/CSSカスタマイズが仕込まれていて、カスタマイズ用の一覧を選べばグラフが描写されます。<br/>

一覧を **ダッシュボード** に変更すると・・・
<img src="https://docs.google.com/drawings/d/e/2PACX-1vT70yfwj1JnGgF_lfHTF-7jQXEPVWKzzXeJ2peKWEhZj7LrCJB81wd44twRHstRmTs00ImmIzXCQCNn/pub?w=927&amp;h=489">
<img src="https://docs.google.com/drawings/d/e/2PACX-1vQjMDAuEoKxxlRZop_YmrOHz44mAxOPQG3M-ezDEewuL1FyDnTnITEfR2Scfx9-8mYgKfONHVPFIU5Q/pub?w=794&amp;h=662">
こんな画面を自由につくることができます！<br/>

JavaScriptのライブラリも読み込めるので、

- [Chart.js](https://www.chartjs.org/) : 今回使ったライブラリ
- [amCharts.js](https://www.amcharts.com/) : 最近知った良さげなやつ
- [c3.js](https://c3js.org/) : シンプル！！

などいろいろ使えます。もちろんグラフ以外のライブラリもOKです！（moment.jsとかanime.jsとか）
<br/>
<br/>
以上でkintoneのグラフ部分の動作チェックは完了です！<br/>
次はkintone×LINE連携のカスタマイズの動作チェックをします。