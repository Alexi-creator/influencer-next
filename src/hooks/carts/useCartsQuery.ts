import { useQuery } from "@tanstack/react-query"
import { API_URLS } from "@/constants/api"
import { cartsQueryKey } from "@/settings/carts"
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
    staleTime: Infinity, // Данные никогда не устаревают, обновляются только через мутации
    refetchOnMount: false, // Не запрашивать при монтировании
    refetchOnWindowFocus: false, // Не запрашивать при фокусе окна
  })
}
