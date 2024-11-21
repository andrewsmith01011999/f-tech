export const redeemKeys = {
    all: ['redeems'] as const,
    documents: () => [...redeemKeys.all, 'documents'] as const,
    history: () => [...redeemKeys.all, 'history'] as const,
    myReward: () => [...redeemKeys.all, 'myReward'] as const,
    detail: (rewardId: string) => [...redeemKeys.all, 'detail', rewardId] as const,
};
