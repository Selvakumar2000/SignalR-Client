import { Component, OnInit } from '@angular/core';
import { SignalRMediumService } from '../services/signal-r-medium.service';

@Component({
  selector: 'app-signal-r-medium',
  templateUrl: './signal-r-medium.component.html',
  styleUrls: ['./signal-r-medium.component.css']
})
export class SignalRMediumComponent implements OnInit{

  constructor(private signalRService: SignalRMediumService) {

  }

  ngOnInit(): void {
    this.signalRService.startConnection(); //it will take 2ms or 2 micro seconds to complete
  }
}
