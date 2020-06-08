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

  const STATUS = {
    'PREPARING': {
      CLASS: 'kintoneplugin-button-normal',
      MSG: '準備',
      TEXT: '商品の準備完了',
      NEXT: 'READY'
    },
    'READY': {
      CLASS: 'kintoneplugin-button-dialog-ok',
      MSG: '受取',
      TEXT: '商品の受取完了',
      NEXT: 'DELIVERED'
    },
  };

  // 詳細画面でメッセージを1件送信する処理
  kintone.events.on([
    'app.record.detail.show',
    'mobile.app.record.detail.show'
  ], event => {
    const isMobile = event.type.split('.')[0] === 'mobile';
    const headerSpace = isMobile ? kintone.mobile.app.getHeaderSpaceElement() : document.getElementsByClassName('gaia-argoui-app-toolbar-statusmenu')[0];

    if (event.record['delivery_state'].value === 'DELIVERED') return;
    if (event.record['pay_state'].value !== 'PAID') return;

    const status = event.record['delivery_state'].value;

    const exitBtn = document.getElementById('kintone-send-status-button');
    if (exitBtn) document.parentNode.removeChild(exitBtn);
    const btn = document.createElement('button');
    btn.id = 'kintone-send-status-button';
    btn.classList.add(STATUS[status].CLASS);
    btn.textContent = STATUS[status].TEXT;
    headerSpace.appendChild(btn);

    btn.onclick = () => {
      const herokuURL = event.record['app_url'].value;
      const orderID = event.record['order_id'].value;
      swal({
        title: '確認',
        text: `商品の【${(STATUS[status].MSG)}】完了メッセージを送信しますか？`,
        icon: 'info',
        buttons: true,
      }).then(isSend => {
        if (!isSend) throw new Error('キャンセル');
        return postOrderStatus(herokuURL, orderID, STATUS[status].NEXT);
      }).then(resp => {
        console.log(resp);
        if (resp[1] === 200) return putKintoneRecord(STATUS[status].NEXT);
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
