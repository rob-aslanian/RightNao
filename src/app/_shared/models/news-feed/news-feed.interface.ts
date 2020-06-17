import { IFile } from "../files.interface";
import { ICompanyProfile, IUserProfile } from "../shared/shared.models";
import { NewsFeedTagsType, NewsFeedLikeType } from "./news-feed.model";

export interface INewsFeedProfile {
    id?:string,
    isCompany?:boolean
}


interface INewsFeedPostComment {
    id?:string;
    user_profile?:IUserProfile,
    company_profile?:ICompanyProfile
    text?:string;
    files?:IFile[],
    created_at?:string;
    changed_at?:string;
    isNew?:boolean;
}
export interface INewsFeedComment extends INewsFeedPostComment {
    isReply?:boolean;
    likes_amount?:any
}

export interface INewsFeedPost extends INewsFeedPostComment{ 
    isEdit?:boolean;
    _change?:boolean;
}

export interface INewsFeedTags {
    id?:string;
    type?:NewsFeedTagsType;
}

interface INewsFeedPostAction{
    company_id?: string;
    text?: string;
    tags?: INewsFeedTags[]
}
export interface INewsFeedPostChange extends INewsFeedPostAction{
    post_id?: string;
    is_pinned?: boolean;
}

export interface INewsFeedAddPost extends INewsFeedPostAction{
    newsfeed_user_id?: string;
    newsfeed_company_id?:string;
    shared_post_id?: string;
}
export interface INewsFeedReaction {
    id?:string;
    postId?:string;
    type?:string;
    isLiked?:boolean;
    hasLiked?:boolean;

    _prevType?:string;
    _isComment?:boolean;
}

export interface INewsFeedLike {
    id?: string;
    type?: NewsFeedLikeType;
    emoji?:string;
}


