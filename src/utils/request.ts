import { HttpMethods } from "@/constants/httpMethods"

export interface IOptions {
  body?: string
  credentials?: "include" | "omit" | "same-origin" | undefined
  method?: HttpMethods
  fetchController?: AbortController
}

/**
 * Общий fetch для запросов
 */
export const request = async <T>(url: string, options: IOptions = {}): Promise<T> => {
  const defaultOptions: IOptions = { method: HttpMethods.GET }
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

  return response.json() as Promise<T>
}
