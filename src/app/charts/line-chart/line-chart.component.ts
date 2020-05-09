import { SalesDataService } from './../../services/sales-data.service';
import { LINE_CHART_COLORS } from './../../shared/chart.colors';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// const LINE_CHART_SAMPLE_DATA: any[] = [
//   {
//     data: [32, 34, 46, 23, 55, 56],
//     label: 'Sentiment Analysis',
//   },
//   {
//     data: [32, 53, 33, 23, 44, 44],
//     label: 'Image Recognition',
//   },
//   {
//     data: [32, 14, 22, 23, 66, 11],
//     label: 'Forecasting',
//   },
// ];

// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(private _salesDataService: SalesDataService) {}

  topCustomers: string[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    response: true,
  };
  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
    this._salesDataService.getOrders(1, 100).subscribe((res) => {
      this.allOrders = res.page.data;
      console.log(this.allOrders);

      this._salesDataService.getOrdersByCustomer(3).subscribe((cus) => {
        this.topCustomers = cus.map((x) => x.name);

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        let dates = allChartData
          .map((x) => x.data)
          .reduce((a, i) => {
            a.push(i.map((o) => new Date(o[0])));
            return a;
          }, []);

        dates = [].concat.apply([], dates);
        // console.log('dates', dates);

        // tslint:disable-next-line: no-string-literal
        const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
        // console.log(r);

        this.lineChartLabels = r[0].orders.map((o) => o.dates).reverse();

        this.lineChartData = [
          { data: r[0].orders.map((x) => x.total), label: r[0].customer },
          { data: r[1].orders.map((x) => x.total), label: r[1].customer },
          { data: r[2].orders.map((x) => x.total), label: r[2].customer },
        ];
      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter((o) => o.customer.name === name);

    // console.log('name: ', name, 'customer orders', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    // console.log(formattedOrders);
    const result = { customer: name, data: formattedOrders };

    // console.log(result);

    return result;
  }

  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer', 'XYZ', 'orders':}, {}, {}}

    const customers = this.topCustomers;
    const prettyDates = dates.map((x) => this.toFriendlyDate(x));
    // console.log(prettyDates);
    const u = Array.from(new Set(prettyDates)).sort();
    // console.log(u);

    // define our result object to return;
    const result = {};
    // tslint:disable-next-line: no-string-literal
    const dataSets = (result['data'] = []);

    customers.reduce((x, y, i) => {
      // console.log('Reducing: ', y, 'at index:', i);
      const customerOrders = [];
      // console.log('i', i);
      dataSets[i] = {
        customer: y,
        // tslint:disable-next-line: no-shadowed-variable
        orders: u.reduce((r, e, i) => {
          const obj = {};
          // tslint:disable-next-line: no-string-literal
          obj['date'] = e;
          // tslint:disable-next-line: no-string-literal
          obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
          customerOrders.push(obj);
          // console.log(
          //   'Reducing:',
          //   e,
          //   'at index:',
          //   i,
          //   'customerOrders',
          //   customerOrders
          // );
          return customerOrders;
        }),
      };
      return x;
    }, []);

    return result;
    // console.log(result);
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    // console.log('allOrders:', this.allOrders);
    const r = this.allOrders.filter(
      (o) =>
        o.customer.name === customer && this.toFriendlyDate(o.placed) === date
    );

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }
}
