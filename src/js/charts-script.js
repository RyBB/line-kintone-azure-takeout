(() => {
  'use strict';
  const VIEWID = 5118422;
  const ramdomNum = (MAX, MIN) => 10 + (Math.floor(Math.random() * MAX) + MIN);
  const SAMPLE = {
    label: ['2020/1', '2020/2', '2020/3', '2020/4', '2020/5', '2020/6'],
    data: [{
      name: 'チーズバーガー',
      amount: [ramdomNum(8, 3), ramdomNum(8, 3), ramdomNum(8, 3), ramdomNum(8, 3), ramdomNum(8, 3), 0],
    },
    {
      name: 'テリヤキバーガー',
      amount: [ramdomNum(10, 5), ramdomNum(10, 5), ramdomNum(10, 5), ramdomNum(10, 5), ramdomNum(10, 5), 0]
    }],
  };

  const getRecords = () => {
    const app = kintone.app.getId();
    const query = 'order by ordered_at asc limit 500';
    return kintone.api(kintone.api.url('/k/v1/records'), 'GET', {app, query});
  };
  const createLineChart = DOMID => {
    const ctx = document.getElementById(DOMID).getContext('2d');
    const cheeseProfit = SAMPLE.data[0].amount.map(val => val * 500);
    const teriyakiProfit = SAMPLE.data[1].amount.map(val => val * 500); // .reduce((a, x) => a + ((x || 0) - 0), 0);
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: SAMPLE.label,
        datasets: [{
          label: '売上高',
          data: cheeseProfit.map((val, index) => Number(val) + Number(teriyakiProfit[index]))
        }]
      },
    });
  };
  const createLineChart2 = DOMID => {
    const ctx = document.getElementById(DOMID).getContext('2d');
    const cheeseProfit = SAMPLE.data[0].amount.map(val => val * 500);
    const teriyakiProfit = SAMPLE.data[1].amount.map(val => val * 500); // .reduce((a, x) => a + ((x || 0) - 0), 0);

    const cheeseSumProfit = [];
    const teriyakiSumProfit = [];
    cheeseProfit.forEach((val, index) => cheeseSumProfit.push((cheeseSumProfit[index - 1] || 0) + val));
    teriyakiProfit.forEach((val, index) => teriyakiSumProfit.push((teriyakiSumProfit[index - 1] || 0) + val));
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: SAMPLE.label,
        datasets: [{
          label: '売上高(積み上げ)',
          data: cheeseSumProfit.map((val, index) => Number(val) + Number(teriyakiSumProfit[index]))
        }]
      },
      options: {
        plugins: {
          colorschemes: {
            scheme: 'tableau.Tableau20'
          }
        },
      }
    });
  };
  const createBarChart = DOMID => {
    const ctx = document.getElementById(DOMID).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: SAMPLE.label,
        datasets: [{
          label: SAMPLE.data[0].name,
          data: SAMPLE.data[0].amount,
        },
        {
          label: SAMPLE.data[1].name,
          data: SAMPLE.data[1].amount,
        }]
      },
      options: {
        title: {
          display: true,
          text: '※サンプルデータ'
        },
        plugins: {
          colorschemes: {
            scheme: 'tableau.Tableau10'
          }
        }
      }
    });
  };
  const createDoughnutChart = DOMID => {
    const ctx = document.getElementById(DOMID).getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: SAMPLE.data.map(val => val.name),
        datasets: [{
          data: [
            SAMPLE.data[0].amount.reduce((a, x) => a + ((x || 0) - 0), 0),
            SAMPLE.data[1].amount.reduce((a, x) => a + ((x || 0) - 0), 0)
          ]
        }]
      },
      options: {
        plugins: {
          colorschemes: {
            scheme: 'tableau.Tableau10'
          }
        }
      }
    });
  };

  kintone.events.on(['app.record.index.show', 'mobile.app.record.index.show'], async event => {
    if (event.viewId !== VIEWID) return;

    const recordsData = await getRecords();
    const dataArray = [];

    // kintoneのデータからチーズバーガーとテリヤキバーガーの注文数を集計
    recordsData.records.forEach(val => {
      SAMPLE.data.forEach((v, i) => {
        dataArray[i] = val['item_name'].value === v.name ? (Number(dataArray[i]) || 0) + Number(val['quantity'].value) : (Number(dataArray[i]) || 0) + 0;
      });
    });
    SAMPLE.data[0].amount[5] += dataArray[0];
    SAMPLE.data[1].amount[5] += dataArray[1];
    createLineChart('myChart1');
    createLineChart2('myChart2');
    createBarChart('myChart3');
    createDoughnutChart('myChart4');
  });
})();
