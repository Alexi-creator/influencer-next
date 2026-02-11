import type { ZodType } from "zod/v4"
import { HttpMethods } from "@/constants/httpMethods"

export interface IOptions<T = unknown> {
  body?: string
  credentials?: "include" | "omit" | "same-origin" | undefined
  method?: HttpMethods
  fetchController?: AbortController
  schema?: ZodType<T>
}

/**
 * Общий fetch для запросов
 */
export const request = async <T>(url: string, options: IOptions<T> = {}): Promise<T> => {
  const defaultOptions: IOptions<T> = { method: HttpMethods.GET }
  const mergedOptions = { ...defaultOptions, ...options }

  const response = await fetch(url, {
    credentials: mergedOptions.credentials,
    headers: mergedOptions.method === HttpMethods.GET ? {} : { "Content-Type": "application/json" },
    ...mergedOptions,
    signal: options.fetchController?.signal,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  if (options.schema) {
    return options.schema.parse(data)
  }

  return data as T
}
