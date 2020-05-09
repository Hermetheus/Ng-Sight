import { ServerMessage } from './../shared/server-message';
import { Server } from './../shared/server';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  constructor() {}

  color: string;
  buttonText: string;
  serverStatus: string;
  isLoading: boolean;

  @Input() serverInput: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.buttonText = 'Shut Down';
      this.color = '#66BB6A';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }

  // toggleStatus(onlineStatus: boolean) {
  //   console.log(this.serverInput.name, ': ', onlineStatus);
  //   this.setServerStatus(!onlineStatus);
  // }

  makeLoading() {
    this.color = '#FFCA28';
    this.buttonText = 'Pending...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction called!');
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if (isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactivate',
      };
    } else {
      return {
        id: this.serverInput.id,
        payload: 'activate',
      };
    }
  }
}
