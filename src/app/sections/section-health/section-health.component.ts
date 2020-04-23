import { Server } from './../../shared/server';
import { Component, OnInit } from '@angular/core';

const SAMPLE_SERVERS = [
  { id: 1, name: 'dev-web', isOnline: true },
  { id: 2, name: 'dev-mail', isOnline: true },
  { id: 3, name: 'prod-web', isOnline: true },
  { id: 4, name: 'prod-mail',  isOnline: false },
];
@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.scss'],
})
export class SectionHealthComponent implements OnInit {
  constructor() {}

  servers: Server[] = SAMPLE_SERVERS;

  ngOnInit(): void {}
}
