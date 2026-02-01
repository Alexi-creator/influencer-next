// Время серверного кэша
export const revalidateTime: number = 120

// Имя тега по которому будет устанавливаться и сбрасываться серверный кэш
export const revalidateNameTag = "carts"

// Ключ для tanstack query
export const cartsQueryKey = "carts" as const
