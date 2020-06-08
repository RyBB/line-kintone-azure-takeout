(() => {
  'use strict';

  // LINEへ注文ステータスを送信する関数
  const postOrderStatus = (herokuURL, orderId, status) => {
    const HEROKU_URL = `${herokuURL}/api/notifyOrderDeliveryState`;
    const AUTH = 'API_KEY_000000000';
    const header = {
      'Authorization': AUTH,
      'Content-Type': 'application/json'
    };
    const body = {
      orderId,
      deliveryState: status
    };
    return kintone.proxy(HEROKU_URL, 'POST', header, body);
  };

  // kintoneのステータスを更新する関数
  const putKintoneRecord = nextStatus => {
    const app = kintone.app.getId();
    const id = kintone.app.record.getId();
    const record = {
      'delivery_state': {
        value: nextStatus
      },
      'delivered_at': {
        value: nextStatus === 'DELIVERED' ? moment().format('YYYY-MM-DDTHH:mm:00Z') : ''
      }
    };
    return kintone.api(kintone.api.url('/k/v1/record'), 'PUT', {app, id, record});
  };

  // 詳細画面でメッセージを1件送信する処理
  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show'
  ], event => {
    const isMobile = event.type.split('.')[0] === 'mobile';
    const headerSpace = isMobile ? kintone.mobile.app.getHeaderSpaceElement() : document.getElementsByClassName('gaia-argoui-app-toolbar-statusmenu')[0];

    if (event.record['delivery_state'].value === 'DELIVERED') return;

    const status = event.record['delivery_state'].value;
    const nextStatus = status === 'PREPARING' ? 'READY' : 'DELIVERED';
    const btnClass = status === 'PREPARING' ? 'kintoneplugin-button-normal' : 'kintoneplugin-button-dialog-ok';

    const exitBtn = document.getElementById('kintone-send-status-button');
    if (exitBtn) {
      exitBtn.classList.remove('kintoneplugin-button-normal');
      exitBtn.classList.remove('kintoneplugin-button-dialog-ok');
      exitBtn.classList.add(btnClass);
      exitBtn.textContent = status === 'PREPARING' ? '商品の準備完了' : '商品の受取完了';
      return;
    }
    const btn = document.createElement('button');
    btn.id = 'kintone-send-status-button';
    btn.classList.add(btnClass);
    btn.textContent = status === 'PREPARING' ? '商品の準備完了' : '商品の受取完了';
    headerSpace.appendChild(btn);

    btn.onclick = () => {
      const herokuURL = event.record['app_url'].value;
      const orderID = event.record['order_id'].value;
      swal({
        title: '確認',
        text: `商品の【${(nextStatus === 'READY' ? '準備' : '受取')}】完了メッセージを送信しますか？`,
        icon: 'info',
        buttons: true,
      }).then(isSend => {
        if (!isSend) throw new Error('キャンセル');
        return postOrderStatus(herokuURL, orderID, nextStatus);
      }).then(resp => {
        console.log(resp);
        if (resp[1] === 200) return putKintoneRecord(nextStatus);
        throw new Error('送信失敗');
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
