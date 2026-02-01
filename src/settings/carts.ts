// Имя тега по которому будет устанавливаться и сбрасываться серверный кэш
export const revalidateNameTag = "carts" as const

// Время серверного кэша в секундах
export const serverRevalidateTime: number = 120

// Ключ для tanstack query
export const cartsQueryKey = "carts" as const

// Время клиентского кэша в милисекундах
export const clientRevalidateTime: number = 5 * 60 * 1000
