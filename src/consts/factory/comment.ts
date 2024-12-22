export const commentKeys = {
    all: ['comments'] as const,
    byPost: (postId: string) => [...commentKeys.all, 'byPost', postId] as const,
    listing: () => [...commentKeys.all, 'listing'] as const,
    listingParam: (params: object = {}) => [...commentKeys.all, 'listing', params] as const,
    listingAnotherAccount: (id: string) => [...commentKeys.all, 'listing', 'another-account', id] as const,
};
