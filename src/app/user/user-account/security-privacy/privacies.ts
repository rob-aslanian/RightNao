
export default {
    me:"Only me",
    my_connections:"My connections",
    members:"HyperCube members",
    find_by_email:{
        me:"Nobody",
        my_connections:"My connections",
        members:"HyperCube members",
    }
};
export interface ISessions{
    browser?:string
    browser_version?:string
    current_session?:boolean
    device_type?:string
    id?:string
    last_activity_time?:string
    os?:string
    os_version?:string
}