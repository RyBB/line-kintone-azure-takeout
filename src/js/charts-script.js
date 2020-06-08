(() => {
  'use strict';

  const VIEWID = 5118412;

  const getRecords = () => {
    const app = kintone.app.getId();
    const query = 'order by ordered_at asc limit 500';
    return kintone.api(kintone.api.url('/k/v1/records'), 'GET', {app, query});
  };

  const createBarChart = (DOMID, DATA) => {
    const ctx = document.getElementById(DOMID).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45]
        }]
      }
    });
  };
  const createDoughnutChart = (DOMID, DATA) => {
    const labelArray = [];
    DATA.records.forEach(val => {
      if (!labelArray.find(v => v === val['title'].value)) labelArray.push(val['title'].value);
    });

    const dataArray = [];
    DATA.records.forEach(val => {
      labelArray.forEach((v, i) => {
        dataArray[i] = val['title'].value === v ? (Number(dataArray[i]) || 0) + 1 : (Number(dataArray[i]) || 0) + 0;
      });
    });
    console.log(dataArray);
    const ctx = document.getElementById(DOMID).getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labelArray,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: dataArray
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
    console.log(recordsData);
    createDoughnutChart('myChart2', recordsData)
    createBarChart('myChart1', recordsData);
  });
})();