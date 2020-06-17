import { Injectable } from '@angular/core';
import { MEDIA_STREAM_CONSTRAINTS_DEFUALT, RTC_CONNECTION_CONFIGURATION, RTC_OFFER_OPTIONS } from './index.model';
import helper from './helper';
import * as io from "socket.io-client";
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';


@Injectable({
  providedIn:"root"
})
export class WebRTCService {

  ownerPC:RTCPeerConnection

  private _localVideo:HTMLVideoElement
  private _localStream:MediaStream;
  private _remoteVideo:HTMLVideoElement;
  private _remoteStram:MediaStream;
  private socket:SocketIOClient.Socket;

  constructor(
    private globalService:GlobalUserProService
  ) {   
   
  }

  set localVideo(value:HTMLVideoElement) {
     this._localVideo = value
  }

  get localVideo() : HTMLVideoElement {
    return this._localVideo
  }

  set remoteVideo(value:HTMLVideoElement) {
      this._remoteVideo = value
  }

  get remoteVideo() : HTMLVideoElement {
    return this._remoteVideo
  }


  /**
   * Start call 
   */
  public async start() {
    this.wsConnect();  
    
    try {
       // @CHANGE 
       const stream = await helper.getScreen();
       this.localVideo.srcObject = stream;
       this._localStream = stream;
       this.socket.emit("hangup", "test");
    } catch (error) {
      console.log(error);
  
    }
  }
  

  /**
   * Create RPC connection 
   * 
   * @param configutation 
   */
  public async createRPCConnection(configutation:RTCConfiguration = RTC_CONNECTION_CONFIGURATION) {

    this.ownerPC = new RTCPeerConnection(configutation);


    this.ownerPC.addEventListener("negotiationneeded" , this.createOffer.bind(this));
    this.ownerPC.addEventListener("connectionstatechange", (e) => this.handleConnectionState(e))
    this.ownerPC.addEventListener("icecandidate" , e => this.handleICECandidate(e));
    this.ownerPC.addEventListener("track" , this.gotRemoteStream.bind(this));


  }

  /**
   * Call to someone , create RTC connection 
   * get user media and set local RTC location
   * 
   * @param profileID 
   */
  public async call(profileID:string) {

    // Not to call yourself 
    if(profileID === this.globalService.getProfileId()) {
      return;
    }

    // Create connection 
    if(this.ownerPC == undefined) {
      this.createRPCConnection();
    }

    // Get user media (screen or webcam)
    try {
        // @CHANGE 
        const stream = await helper.getScreen();
        this.localVideo.srcObject = stream;
        this._localStream = stream;
        // this.socket.emit("hangup", "test");
    } catch (error) {
      console.log(error);
  
    }

    // Set user stream to RPC connecion 
    try {
      this.setUserMediaToRPC();
    } catch (error) {
      console.log(error);
      
    }

  }

  /**
   * Create RTC answer 
   * When someone call , can handle call and make answer 
   * 
   * @param msg 
   */
  public async answer(msg:RTCSessionDescriptionInit) {
     // Not have connected yet , create connection  
     if(!this.ownerPC) {
       this.createRPCConnection();
     }

     let desc = new RTCSessionDescription(msg);

     if (this.ownerPC.signalingState != "stable") {
       await Promise.all([
         this.ownerPC.setLocalDescription({type:"rollback"}),
         this.ownerPC.setRemoteDescription(desc)
       ])

       return;
     } else {
       await this.ownerPC.setRemoteDescription(desc);
     }


    // Set Local Stream
    this.setUserMedia();

    // Set user stream to RPC connecion 
    try {
      this.setUserMediaToRPC();
    } catch (error) {
      console.log(error);
      
    }



     // Send answer 
     await this.ownerPC.setLocalDescription(await this.ownerPC.createAnswer());

     this.socket
         .emit("answer" , {
           sender:this.globalService.getProfileId(),
           sdp:this.ownerPC.localDescription,
         })
  }

  private gotRemoteStream(e:RTCTrackEvent) {
      if (this.remoteVideo.srcObject !== e.streams[0]) {
        this.remoteVideo.srcObject = e.streams[0];   
      }
  }


  private async handleICECandidate(e:RTCPeerConnectionIceEvent) {
      if(e.candidate !== null) {
        // @CHANGE
        this.socket
            .emit("test" , {
              type:"new-candidate",
              sender:this.globalService.getProfileId(),
              candidate:e.candidate,
            })
      }
  }

  private handleConnectionState(e:any) {
    switch (e.iceConnectionState) {
      case "closes":
      case "failed":
      case "disconnected":
        this.hangUp();
        break;

    }
    
  }

  private async createOffer(offerOptions:RTCOfferOptions = RTC_OFFER_OPTIONS) {
      try {
        const offer = await this.ownerPC.createOffer(offerOptions);
        await this.ownerPC.setLocalDescription(offer);
    
        // @CHANGE 
        this.socket
            .emit("offer" , {
              sender:this.globalService.getProfileId(),
              sdp:this.ownerPC.localDescription
            })
      } catch (e) {
          console.log(e);
          
      }

  

  }

  public hangUp(){
    this.ownerPC.close();
    this.ownerPC = null;
  }

  
  /**
   * Get user audio / video stream 
   * 
   * @param constaints 
   */
  public getUserMedia(constaints:MediaStreamConstraints = MEDIA_STREAM_CONSTRAINTS_DEFUALT) : Promise<MediaStream> {
      return navigator.mediaDevices
                      .getUserMedia(constaints)
  }

  /**
   * Set user media , now is only screen shareing ,
   * @todo add functinality toc choose brtween screen or webcam
   */
  private async setUserMedia() {
     // Set Local Stream
     try {
        // @CHANGE 
        const stream = await helper.getScreen();
        this.localVideo.srcObject = stream;
        this._localStream = stream;
    } catch (error) {
        console.log(error);
    }
  }

  /**
   * Set User media 
   */
  public async setUserMediaToRPC() {
     this._localStream
         .getTracks()
         .forEach(track => {
             this.ownerPC.addTrack(track , this._localStream)
         })
  }

  
  public wsConnect() {

   if (!this.socket) {
      this.socket = io.connect(`${location.protocol}//${location.host}` , 
                    { 
                      path:'/ws/socket.io',
                      reconnectionAttempts:10, 
                      query:{
                        sender:this.globalService.getProfileId()
                      },
                    })


      this.socket.on("disconnnect" , err => {
         this.socket.close();
         console.log(err);  
      })

        
   }


  }

}
