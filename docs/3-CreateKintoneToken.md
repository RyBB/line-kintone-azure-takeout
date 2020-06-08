# URL/アプリIDの確認と認証

外部からkintoneにアクセスするためには、

- URL（サブドメイン）
- アプリID
- 認証情報

の3つが必要になります。画面上ですべて確認・生成できるので簡単です！

## URL

kintoneは環境ごとに異なるサブドメインを含むURLを持っています。<br/>
URL部分の `https://{subdomain}.cybozu.com` の **{subdomain}** 部分がサブドメインです。<br/>
<br/>
後ほどheroku上で利用するので、`{subdomain}.cybozu.com`部分をメモしておいてください。

## アプリID

kintone上にはいわゆるデータベースのテーブルとして **アプリ** を複数作成することができます。<br/>
先ほど作成した **4つのアプリのどれか** を開くと、URLに `https://{subdomain}.cybozu.com/k/XXXX` と番号がつきます。<br/>
<img src="https://docs.google.com/drawings/d/e/2PACX-1vRKcTxsZYQwUmPtcVqaJ0a5A_RCKp2IiaQZxmSDmHE129otTtiHxI902qNEpWp5bxgJeJ8gCucr9gKm/pub?w=778&amp;h=343">
この数字が **アプリID** となります。こちらも後ほどheroku上で利用するので、数字をメモしておいてください。

- 【テイクアウト】問い合わせ管理
- 【テイクアウト】顧客管理
- 【テイクアウト】決済管理
- 【テイクアウト】注文管理

4つのアプリの数字をそれぞれメモしておいてください。

## 認証

認証方法にはいくつか方法がありますが、今回はアプリを4つ利用するのでログイン認証を利用します。<br/>
kintoneにログインするときに利用する **ログイン名** と **パスワード** をheroku上で利用します。<br/>
<br/>
<br/>
以上で連携に必要な認証情報などの用意は完了です!<br/>
次はLINE側の設定に移ります。