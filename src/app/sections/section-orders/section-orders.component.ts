import { Order } from './../../shared/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.scss'],
})
export class SectionOrdersComponent implements OnInit {
  constructor() {}

  orders: Order[] = [
    {
      id: 1,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2019, 12, 1),
      fulfilled: new Date(2019, 12, 2),
      status: 'Completed',
    },
    {
      id: 2,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2019, 12, 1),
      fulfilled: new Date(2019, 12, 2),
      status: 'Completed',
    },
    {
      id: 3,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2019, 12, 1),
      fulfilled: new Date(2019, 12, 2),
      status: 'Completed',
    },
    {
      id: 4,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2019, 12, 1),
      fulfilled: new Date(2019, 12, 2),
      status: 'Completed',
    },
    {
      id: 5,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2019, 12, 1),
      fulfilled: new Date(2019, 12, 2),
      status: 'Completed',
    },
  ];

  ngOnInit(): void {}
}
