export type Transaction = {
    transactionId: string;
    amount: number;
    type: string;
    createdDate: string
};

export type DailyPointTransaction = {
    dailyPointId: string,
    pointEarned: number,
    createdDate: string
}

export type BonusPoint = {
    dailyPointId: string,
    pointEarned: number,
    createdDate: string
}

export type FilterTransaction = {
    transactionList: Transaction[];
    dailyPointList: DailyPointTransaction[];
    bonusPoint: BonusPoint[];
}