import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WebRTCService } from 'src/app/webRTC-provider/web-rtc.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild("local" , { static:false }) local:ElementRef<HTMLVideoElement>;
  @ViewChild("remote" , { static:false }) remote:ElementRef<HTMLVideoElement>;

  constructor(
    private rtcService:WebRTCService
  ) { }

  ngOnInit() {
  }


    ngAfterViewInit(): void {
      this.rtcService.localVideo = this.local.nativeElement;
      this.rtcService.remoteVideo = this.remote.nativeElement;

      
  }

  start(){
    this.rtcService.start();

    
  }

  call(){
    this.rtcService.createRPCConnection();
  }


}
