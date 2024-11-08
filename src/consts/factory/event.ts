export const eventKeys = {
    all: ['events'] as const,
    listing: (params: object = {}) => [...eventKeys.all, 'listing', params] as const,
};
