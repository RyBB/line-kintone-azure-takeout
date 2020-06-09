(() => {
  'use strict';

  // herokuへメッセージテキストを送信する関数 (→LINEへメッセージが送信される)
  const postLINEMessage = (herokuURL, userIds, content) => {
    const HEROKU_URL = `${herokuURL}/api/sendMulticastMessage`;
    const AUTH = 'API_KEY_000000000';
    const header = {
      'Authorization': AUTH,
      'Content-Type': 'application/json'
    };
    const body = {
      userIds,
      message: {
        title: 'kintoneからメッセージです',
        body: content || '本文なし'
      }
    };
    return kintone.proxy(HEROKU_URL, 'POST', header, body);
  };

  // kintoneの返信日時を更新する関数
  const putKintoneRecord = () => {
    const app = kintone.app.getId();
    const id = kintone.app.record.getId();
    const record = {
      'replied_at': {
        value: moment().format('YYYY-MM-DDTHH:mm:00Z')
      }
    };
    return kintone.api(kintone.api.url('/k/v1/record'), 'PUT', {app, id, record});
  };

  // 詳細画面でメッセージを送信する処理
  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show'
  ], event => {
    const isMobile = event.type.split('.')[0] === 'mobile';
    const headerSpace = isMobile ? kintone.mobile.app.getHeaderSpaceElement() : document.getElementsByClassName('gaia-argoui-app-toolbar-statusmenu')[0];

    if (document.getElementById('kintone-send-line-message-button')) return;
    const btn = document.createElement('button');
    btn.id = 'kintone-send-line-message-button';
    btn.classList.add('kintoneplugin-button-normal');
    btn.textContent = 'メッセージ送信';
    headerSpace.appendChild(btn);

    btn.onclick = () => {
      const data = isMobile ? kintone.mobile.app.record.get() : kintone.app.record.get();
      const herokuURL = data.record['app_url'].value;
      const userId = data.record['user_id'].value;
      const content = data.record['reply_message'].value;
      swal({
        title: '確認',
        text: 'メッセージを送信して良いですか？',
        icon: 'info',
        buttons: true,
      }).then(isSend => {
        if (!isSend) throw new Error('キャンセル');
        if (content) return postLINEMessage(herokuURL, [userId], content);
        return swal({
          title: '確認',
          text: '本文が空ですがメッセージを送信して良いですか？',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        });
      }).then(resp => {
        if (!resp) throw new Error('キャンセル');
        if (resp[1] === 200) return resp;
        return postLINEMessage(herokuURL, [userId], content);
      }).then(res => {
        if (res[1] === 200) return putKintoneRecord();
        throw new Error('キャンセル');
      }).then(() => {
        return swal('送信成功！');
      }).then(() => {
        location.reload();
      }).catch(err => {
        console.log(err);
      });
    };
  });
})();
