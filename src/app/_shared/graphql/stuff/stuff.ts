import gql from 'graphql-tag';

export class stuffGraphql {

    public static submitFeedBack = gql`
        mutation SubmitFeedback( $feedback: AdditionalFeedbackInput! ) {
            SubmitFeedback( feedback: $feedback ){
            id
            success
            }
        }
    `;
    
}