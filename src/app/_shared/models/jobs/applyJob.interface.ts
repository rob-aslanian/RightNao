export interface IApplyJob {
    job_id?: string;
    email?: string;
    phone?: string;
    cover_letter?: string;
    document_id?: string[];
}

export interface IInviteJob {
    companyId?: string;
    userId?: string;
    jobId?: string;
    text?: string;
}