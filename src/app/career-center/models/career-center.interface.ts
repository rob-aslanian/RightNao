export interface IOpenCareerCenter {
    title?: string;
    description?: string;
    cv_button_enabled?: boolean;
    custom_button?:ICareerCenterButton;
}

export interface ICareerCenterButton {
    enabled?: boolean;
    title?: string
    url?: string;
}

export interface IAddCVInCareerCenter {
    ExpierencedProfessionals?: boolean;
    NewJobSeekers?: boolean;
    YoungProfessionals?: boolean;
}