// Имя тега по которому будет устанавливаться и сбрасываться серверный кэш
export const revalidateProductNameTag = "product" as const
// Время серверного кэша в секундах
export const serverRevalidateTime: number = 0 * 5 * 60

// Ключ для tanstack query
export const productQueryKey = "product" as const
// Время клиентского кэша в милисекундах
export const clientRevalidateTime: number = 5 * 60 * 1000
