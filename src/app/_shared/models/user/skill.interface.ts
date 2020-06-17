export interface IUserSkill{
    skills:ISkill[],
    isMe:boolean;
    userId?:string;
    lang?: string
}

export interface ISkill{
    id?: string;
    name?: string;
    endorsements?:any[];
    amount_endorsements?: number;
}
