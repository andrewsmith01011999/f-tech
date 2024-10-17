export const postKeys = {
  all: ['posts'] as const,
  listing: (params: object = {}) => [...postKeys.all, 'listing', params] as const
}