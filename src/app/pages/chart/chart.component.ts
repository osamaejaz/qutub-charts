import { Component, OnInit } from '@angular/core';
import { CHART_API_RESPONSE } from 'src/app/constants/chart';
import { ApiService } from 'src/app/services/api.service';
import Chart, { DatasetChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: any;
  chartData: any = [];
  constructor(
    private _api: ApiService
  ) {}

  async ngOnInit() {
    await this.getChartData();
    this.initChart();
  }

  initChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: this.chartData,
      options: {
          scales: {
              y: {
                  stacked: true
              }
          }
      }
  });
  
  }

  async getChartData() {
    const params = {
      CustomerId: 'BBC77144-AA85-4954-8CDA-0BFC9D931C99',
      fromDate: '2024-04-01',
      toDate: '2024-05-22'
    }
    // const response = await this._api.getChartData({ params }).toPromise();
    const response = CHART_API_RESPONSE;
    this.mapChartData(response);
  }

  mapChartData(data: any[]) {
    const labels = [];
    const datasets = [
      {
        label: '1',
        data: [],
        backgroundColor: 'blue'
      },
      {
        label: "2",
        data: [],
        backgroundColor: 'limegreen'
      } 
    ]
    for (const item of data) {
      const date = item.x && item.x.split('T')[0]
      date ? labels.push(date) : null;
      const [lineItem1, lineItem2] = item.y
      datasets[0].data.push(lineItem1 as never)
      datasets[1].data.push(lineItem2 as never)
    }

    this.chartData = {
      labels,
      datasets
    }
  }
}
