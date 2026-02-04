// Имя тега по которому будет устанавливаться и сбрасываться серверный кэш
export const revalidatePublicationNameTag = "publication" as const
export const revalidateCommentsNameTag = "comments" as const

// Время серверного кэша в секундах
export const serverRevalidateTime: number = 5 * 60
