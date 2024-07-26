import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRMediumService {
  hubConnection: signalR.HubConnection;

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(
      'https://localhost:7208/toastr', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }
    ).build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Hub Connection Started');
      this.askServerListener();
      this.askServer();
    })
    .catch(err => {
      console.log('Error while starting connection: ' + err);
    })
  }

  async askServer() {
    console.log('Ask Server Started');
    await this.hubConnection
    .invoke('AskServer', 'Hi Selva')
    .then( () => {
      console.log('Ask Server.Then()');
    })
    .catch(err => {
      console.log(err);
    });

    console.log('This is the final prompt');
  }

  askServerListener() {
    console.log('Ask Server Listener Started');
    this.hubConnection
    .on('AskServerResponse', (someText) => {
      console.log('Ask Server.Listener');
      console.log(someText);
    });
  }
}
