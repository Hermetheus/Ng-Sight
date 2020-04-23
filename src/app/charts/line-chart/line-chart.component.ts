import { LINE_CHART_COLORS } from './../../shared/chart.colors';
import { Component, OnInit } from '@angular/core';


const LINE_CHART_SAMPLE_DATA: any[] = [
  {
    data: [32, 34, 46, 23, 55, 56],
    label: 'Sentiment Analysis',
  },
  {
    data: [32, 53, 33, 23, 44, 44],
    label: 'Image Recognition',
  },
  {
    data: [32, 14, 22, 23, 66, 11],
    label: 'Forecasting',
  },
];

const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  constructor() {}

  lineChartData = LINE_CHART_SAMPLE_DATA;
  lineChartLabels = LINE_CHART_LABELS;
  lineChartOptions: any = {
    response: true,
  };
  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {}
}
