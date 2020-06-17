const STUN_SERVERS_LIST = [ 
    { urls:"stun:stun.1.google.com:19302" },
    { urls:"stun:stun.ekiga.net" },

]

export const MEDIA_STREAM_CONSTRAINTS_DEFUALT:MediaStreamConstraints =  {
    audio:false,
    video:{
        // @ts-ignore
        mediaSource: 'screen',
        // width:1280,
        // height:720,
        // facingMode:"screen",
        
    },
    
}

export const RTC_CONNECTION_CONFIGURATION:RTCConfiguration = {
    iceServers:[
        {
            urls:["stun:stun.ekiga.net" , "stun:stun.1.google.com:19302"]
        }
    ],
    
}

export const RTC_OFFER_OPTIONS:RTCOfferOptions = {
    offerToReceiveAudio:true,
    offerToReceiveVideo:true,
}