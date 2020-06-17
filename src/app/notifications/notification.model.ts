
export type NotificationType = 'unknown' | 'new_endorsement' | 'new_follow' |
                               'new_connection' | 'approved_connection' | 'recommendation_request' |
                               'new_recommendation' | 'new_review' | 'new_job_invitation' | 'new_applicant' |
                               'new_job_applicant' | 'new_founder_request' | 'new_order' | 'new_proposal';

export interface INotification {
    created_at?: string;
    id?: string;
    receiver_id?: string;
    type?: NotificationType;
    text?:string;
    user_sender_id?:string;
    company_id?:string;
    job_id?:string;
    candidate_id?:string;
    reviewer_user_id?:string;
}


export const NotificationText = {
    /// User 
    new_follow:'start following you',
    recommendation_request:'sent you recommendation request',
    new_recommendation:'sent you a recommendation',
    new_connection:'sent you connection request',
    approved_connection:'has accepted your connection request',
    new_job_invitation:'invite you to apply for this job',
    new_founder_request:'sent you founder request',
    new_endorsement:'endorsed you',

    /// Company
    new_job_applicant:'applied to',
    new_review:'wirte review',

    /// Service 
    new_order:"order your service",
    new_proposal:"send proposal"

}

