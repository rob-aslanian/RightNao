import gql from "graphql-tag";

export class walletGraphql {
    public static getAccoutWalletAmount = gql`
    query GetAccoutWalletAmount( $user_id: ID! ) {
        GetAccoutWalletAmount( user_id: $user_id ) {
            gold_coins
            silver_coins
            pending_amount
        }
    }
    `;
    public static contactInvitationForWallet = gql`
    mutation ContactInvitationForWallet($wallet_input: InvitationWalletInput!) {
        ContactInvitationForWallet(wallet_input: $wallet_input) {
          status
          amount {
            gold_coins
            silver_coins
            pending_amount
          }
        }
      }
    `;
    public static getWalletTransactions = gql`
    query GetWalletTransaction($user_id: ID!,$pagination: PaginationInput! , $type: TransactionTypeEnum!) {
      GetWalletTransactions(user_id:$user_id pagination:$pagination type:$type){
        transitions{
          transaction_type
          status
          wallet_amount{
            gold_coins
            silver_coins
            pending_amount
          }
          transition_at
          coin_type
        }
        transition_amount
      }
    }
    `;
    public static earnCoinsForWallet = gql`
    ,mutation EarnCoinsForWallet($user_id: ID! $wallet_input: WalletInput!){
      EarnCoinsForWallet (user_id: $user_id,wallet_input: $wallet_input) {
        amount{
          gold_coins
          silver_coins
          pending_amount
        }
        status
      }
    }
    `;
}
