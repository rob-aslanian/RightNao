
export interface IReviews {
    id: string;
    score?: string;
    headline?: string;
    description?: string;
    company?: {
      id: string;
      url?: string;
      name?: string;
      avatar?: string;
      foundation_date?: string;
    }
}

export interface IReviewsView extends IReviews {
    score_id: number;
}