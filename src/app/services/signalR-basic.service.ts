import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRBasicService {

  hubConnection: signalR.HubConnection;

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(
      'https://localhost:7208/toastr', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }
    ).build();

    this.hubConnection.start().then(() => {
      console.log('Hub Connection Started');
    }).catch(err => {
      console.log('Error while starting connection: ' + err);
    })
  }

  askServer() {
    this.hubConnection.invoke('AskServer', 'Hi Selva').catch(err => {
      console.log(err);
    });
  }

  askServerListener() {
    this.hubConnection.on('AskServerResponse', (someText) => {
      console.log(someText);
    });
  }
}
