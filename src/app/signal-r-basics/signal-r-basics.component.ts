import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalRBasicService } from '../services/signalR-basic.service';

@Component({
  selector: 'app-signal-r-basics',
  templateUrl: './signal-r-basics.component.html',
  styleUrls: ['./signal-r-basics.component.css']
})
export class SignalRBasicsComponent implements OnInit, OnDestroy {
  
  constructor(private signalRService: SignalRBasicService) {

  }

  ngOnInit(): void {
    this.signalRService.startConnection(); //it will take 2ms or 2 micro seconds to complete

    setTimeout(() => {
      this.signalRService.askServerListener();
      this.signalRService.askServer();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.signalRService.hubConnection.off('AskServerResponse');
  }

}
