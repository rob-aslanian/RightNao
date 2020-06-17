import adapter from "webrtc-adapter"

export default  class {

    /**
     * Get user screen capture 
     */
    public static getScreen() : Promise<MediaStream> {

        switch (adapter.browserDetails.browser) {
            case "chrome":
                // @ts-ignore
                return navigator.mediaDevices.getDisplayMedia({ video:true });
            case "firefox":
                return navigator.mediaDevices
                                .getUserMedia({ video:{
                                    // @ts-ignore
                                    mediaSource: 'screen',
                                }});
            default:
                return navigator.getDisplayMedia({ video:true });
        }
    }

    public static get getProtocol(): string{
        return location.protocol === 'http:' ? 'ws:' : 'wss:';
    }
    

}