import { ServerMessage } from './../../shared/server-message';
import { ServerService } from './../../services/server.service';
import { Server } from './../../shared/server';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';

// const SAMPLE_SERVERS = [
//   { id: 1, name: 'dev-web', isOnline: true },
//   { id: 2, name: 'dev-mail', isOnline: true },
//   { id: 3, name: 'prod-web', isOnline: true },
//   { id: 4, name: 'prod-mail', isOnline: false },
// ];
@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.scss'],
})
export class SectionHealthComponent implements OnInit, OnDestroy {
  constructor(private _serverService: ServerService) {}

  servers: Server[];
  timerSubscription: AnonymousSubscription;

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  refreshData() {
    this._serverService.getServers().subscribe((res) => {
      // console.log(res);
      this.servers = res;
    });

    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000)
      .first()
      .subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg).subscribe(
      (res) => console.log('Message sent to Server'),
      (err) => console.log('Error:', err)
    );
  }
}
