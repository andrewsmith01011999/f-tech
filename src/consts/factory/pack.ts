export const packKeys = {
    all: ['packs'],
    listing: (params = {}) => [...packKeys.all, 'listing', params],
};
