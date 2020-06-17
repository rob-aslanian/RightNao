export interface ITransactions  {
    description?: string,
    amount?: number,
    status: string,
    transaction_type: string,
    transition_at: string,
    walle_amount: {
        gold_coins: number,
        silver_coins: number,
        pending_amount: number,
        _typename?: string
    }
}

export interface ICurrency {
    name: string,
    amount: number,
    accountNumber: string,
    exchangeRate: number
}
