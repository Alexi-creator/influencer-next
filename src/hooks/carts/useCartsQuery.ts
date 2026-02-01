import { useQuery } from "@tanstack/react-query"
import { API_URLS } from "@/constants/api"
import { cartsQueryKey, clientRevalidateTime } from "@/settings/carts"
import type { CartTypes, DataTypes } from "@/types/carts"
import { request } from "@/utils/request"

export const useCartsQuery = (initialData: CartTypes[]) => {
  return useQuery<CartTypes[]>({
    queryKey: [cartsQueryKey],
    queryFn: async (): Promise<CartTypes[]> => {
      const res = await request<DataTypes>(API_URLS.carts)

      return res.data.data
    },
    initialData,
    refetchInterval: clientRevalidateTime, // Автообновление каждые 5 минут
    refetchIntervalInBackground: false, // Не обновлять если вкладка неактивна
    refetchOnMount: false, // Не запрашивать при монтировании (есть initialData с сервера)
    refetchOnWindowFocus: false, // Не запрашивать при фокусе
  })
}
