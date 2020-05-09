import { SalesDataService } from './../../services/sales-data.service';
import { Order } from './../../shared/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.scss'],
})
export class SectionOrdersComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  constructor(private _salesData: SalesDataService) {}

  // orders: Order[] = [
  //   {
  //     id: 1,
  //     customer: {
  //       id: 1,
  //       name: 'Main St Bakery',
  //       state: 'CO',
  //       email: 'mainst@example.com',
  //     },
  //     total: 230,
  //     placed: new Date(2019, 12, 1),
  //     fulfilled: new Date(2019, 12, 2),
  //     status: 'Completed',
  //   },
  //   {
  //     id: 2,
  //     customer: {
  //       id: 1,
  //       name: 'Main St Bakery',
  //       state: 'CO',
  //       email: 'mainst@example.com',
  //     },
  //     total: 230,
  //     placed: new Date(2019, 12, 1),
  //     fulfilled: new Date(2019, 12, 2),
  //     status: 'Completed',
  //   },
  //   {
  //     id: 3,
  //     customer: {
  //       id: 1,
  //       name: 'Main St Bakery',
  //       state: 'CO',
  //       email: 'mainst@example.com',
  //     },
  //     total: 230,
  //     placed: new Date(2019, 12, 1),
  //     fulfilled: new Date(2019, 12, 2),
  //     status: 'Completed',
  //   },
  //   {
  //     id: 4,
  //     customer: {
  //       id: 1,
  //       name: 'Main St Bakery',
  //       state: 'CO',
  //       email: 'mainst@example.com',
  //     },
  //     total: 230,
  //     placed: new Date(2019, 12, 1),
  //     fulfilled: new Date(2019, 12, 2),
  //     status: 'Completed',
  //   },
  //   {
  //     id: 5,
  //     customer: {
  //       id: 1,
  //       name: 'Main St Bakery',
  //       state: 'CO',
  //       email: 'mainst@example.com',
  //     },
  //     total: 230,
  //     placed: new Date(2019, 12, 1),
  //     fulfilled: new Date(2019, 12, 2),
  //     status: 'Completed',
  //   },
  // ];

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit).subscribe((res) => {
      // console.log('Result from getOrders: ', res);
      this.orders = res.page.data;
      this.total = res.page.total;
      this.loading = false;
    });
  }

  goToPrevious() {
    // console.log('Previous button Clicked');
    this.page--;
    this.getOrders();
  }

  goToNext() {
    // console.log('Next Page');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}
