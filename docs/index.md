# トップページ

このドキュメントはLINEとkintoneとAzureを利用してテイクアウトアプリを開発するハンズオンの<br/>
**kintone側** の資料になります。<br/><br/>
左メニューの手順に沿って進めてください。

## 全体の構成図

<img src="https://docs.google.com/drawings/d/e/2PACX-1vTGzbSPOSfOzShZclg7dVyv71nwRgh85WXa0YG41oLES6MDzto_WrGLNfxR1IksKpD99-6gytfd1LAE/pub?w=1276&amp;h=882">

## それぞれのサービスの役割

今回、LINE（LINE Bot, LINE Pay）、kintone、Azure と様々なサービスを利用するので簡単な役割について説明します。

- LINE Bot & LIFF
  - ユーザー側のフロント
- LINE Pay
  - 決済
- kintone
  - データ管理
  - 運営側のフロント
- Azure
  - 多言語対応
  - 感情分析

こんな感じです。かなりリッチな構成ですね^^

## kintone側の構成図

今回、kintoneでは4つのアプリ（DBテーブル）を使用します。

<img src="https://docs.google.com/drawings/d/e/2PACX-1vS55-E0WsPUcOCo_BGN1dzqBdx2gkjTUITheMdlkUjG4WL_XBSoRDMTtdSXhP2B_sI8asRPjFpuWVfl/pub?w=602&amp;h=441">

今回、ユーザーの動きとして

- Botと友だち登録
- 商品注文
- 決済
- 問い合わせ

と4つあるのでそれぞれの動きに合わせてデータの箱を用意しています。