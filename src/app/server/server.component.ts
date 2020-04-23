import { Server } from './../shared/server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  constructor() {}

  color: string;
  buttonText: string;

  @Input() serverInput: Server;

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.buttonText = 'Shut Down';
      this.color = '#66BB6A';
    } else {
      this.serverInput.isOnline = false;
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  toggleStatus(onlineStatus: boolean) {
    console.log(this.serverInput.name, ': ', onlineStatus);
    this.setServerStatus(!onlineStatus);
  }
}
