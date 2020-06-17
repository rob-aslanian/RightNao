

 type supportedType = 'Photo' | 'Video' | 'Music';


 type _case = 'add' | 'delete' | 'primary'; 


 const supportedTypes = {
     Photo: [
            'image/jpeg',
            'image/bmp',
            'image/png',
            'image/gif',
        ],
    Video: [
            'video/mp4',
            'video/3gpp',
            'video/x-msvideo',
            'video/x-flv',
            'video/x-ms-wmv',
            'video/quicktime',
    ],
    Music: [
            'audio/vnd.wav',
            'audio/mp4',
            'audio/mpeg',
            'audio/wav',
            'audio/mp3'
    ]
};
export enum portfolioPath  {
    has_photo =   "Photo",
    has_video =   "Video",
    has_article = "Article",
    has_audio   = "Music"
};


// export const portfolioPath = {
//     "has_photo":"Photo",
//     "has_video":"Video",
//     "has_article":"Article",
//     "has_audio":"Music"
// };
 

export { 
    supportedTypes,
    _case,
    supportedType
};
 