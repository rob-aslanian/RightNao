import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-music',
  templateUrl: './progress-bar-music.component.html',
  styleUrls: ['./progress-bar-music.component.scss']
})
export class ProgressBarMusicComponent implements OnInit {

  player: any;
  @Input( ) set _player( player ) {    
       this.player = player;
  }

  constructor() { }

  ngOnInit() {
  }

}
