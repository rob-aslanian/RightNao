import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 

@Component({
  selector: 'app-music-box',
  templateUrl: './music-box.component.html',
  styleUrls: ['./music-box.component.scss']
})
export class MusicBoxComponent implements OnInit {

  @Input() music: any;
  @Input() index: number;
  @Input() isAdd: boolean = false;

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  
  constructor(

  ) { }

  ngOnInit() {
 
  }

  removeMusic() {

    this.result
    .emit( {
         _case: 'delete',
         index: this.index,
         id: this.music.fileId ? this.music.fileId : undefined,
         portfolioId: this.music.portfolioId ? this.music.portfolioId : undefined
    })
      
  }

  download( file: any ) {
      const aEl =  document.createElement( 'a' );
      aEl.href = `/file/${file.file}`;
      aEl.download = file.name;
      
      aEl.click();

      aEl.remove();

      this.result.emit({
          _case: 'download',
          index: this.index,
          id: this.music.fileId ? this.music.fileId : undefined,
          portfolioId: this.music.portfolioId ? this.music.portfolioId : undefined
      })
       
  }

}
