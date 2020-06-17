import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from "@angular/core";
import { WebRTCService } from "../webRTC-provider/web-rtc.service";


@Component({
  selector: 'app-virtual-work',
  templateUrl: './virtual-work.component.html',
  styleUrls: ['./virtual-work.component.scss']
})
export class VirtualWorkComponent implements OnInit {



  constructor(
    private rtcService:WebRTCService
  ) { }

  ngOnInit() {

    
  }

  // ngAfterViewInit(): void {
  //     this.rtcService.localVideo = this.local.nativeElement;
  //     this.rtcService.remoteVideo = this.remote.nativeElement;

      
  // }

  // start(){
  //   this.rtcService.start();

    
  // }

  // call(){
  //   this.rtcService.createRPCConnection();
  // }

}
