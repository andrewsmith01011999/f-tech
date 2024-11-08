export const followKeys = {
  all: ['follows'] as const,
  topAccounts: () => [...followKeys.all, 'top-accounts'] as const,
}