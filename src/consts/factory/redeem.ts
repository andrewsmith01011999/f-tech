export const redeemKeys = {
    all: ['redeems'] as const,
    documents: () => [...redeemKeys.all, 'documents'] as const,
};
