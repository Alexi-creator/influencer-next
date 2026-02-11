import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_URLS } from "@/constants/api"
import { HttpMethods } from "@/constants/httpMethods"
import { cartsQueryKey } from "@/settings/carts"
import type { CartsDataTypes, CartTypes } from "@/types/carts.schema"
import { request } from "@/utils/request"

export const useUpdateCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (updatedCarts: CartTypes[]) => {
      const res = await request<CartsDataTypes>(API_URLS.carts, {
        method: HttpMethods.PUT,
        body: JSON.stringify(updatedCarts),
      })

      return res.data.data
    },

    onMutate: async (updatedCarts: CartTypes[]) => {
      await queryClient.cancelQueries({ queryKey: [cartsQueryKey] })

      const previousCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])

      // Оптимистичное обновление — ставим подготовленные данные
      queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)

      return { previousCarts }
    },

    onSuccess: (updatedCarts) => {
      queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)

      // TODO после подключения реальной апишки нужно расскомментировать
      // revalidateCarts()
    },

    onError: (_error, _payload, context) => {
      if (context?.previousCarts) {
        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], context.previousCarts)
      }
    },
  })

  const removeGoods = (cartId: number, goodsId: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    if (!currentCarts) return

    const updatedCarts = currentCarts.map((cart) => {
      if (cart.id !== cartId) return cart
      return { ...cart, goods: cart.goods.filter((item) => item.id !== goodsId) }
    })

    mutation.mutate(updatedCarts)
  }

  const toggleSelectGoods = (cartId: number, goodsId: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    if (!currentCarts) return

    const updatedCarts = currentCarts.map((cart) => {
      if (cart.id !== cartId) return cart

      const updatedGoods = cart.goods.map((item) =>
        item.id === goodsId ? { ...item, isSelected: !item.isSelected } : item,
      )

      const toggledItem = updatedGoods.find((item) => item.id === goodsId)
      const newItemSelected = toggledItem?.isSelected ?? false

      let newIsAllSelected = cart.isAllSelected

      if (newItemSelected) {
        const allNonDisabledSelected = updatedGoods
          .filter((item) => !item.isDisabled)
          .every((item) => item.isSelected)
        if (allNonDisabledSelected) {
          newIsAllSelected = true
        }
      } else {
        if (cart.isAllSelected) {
          newIsAllSelected = false
        }
      }

      return { ...cart, isAllSelected: newIsAllSelected, goods: updatedGoods }
    })

    mutation.mutate(updatedCarts)
  }

  const updateGoodsAmount = (cartId: number, goodsId: number, amount: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    if (!currentCarts) return

    const updatedCarts = currentCarts.map((cart) => {
      if (cart.id !== cartId) return cart
      return {
        ...cart,
        goods: cart.goods.map((item) => (item.id === goodsId ? { ...item, amount } : item)),
      }
    })

    mutation.mutate(updatedCarts)
  }

  // Изменение количества товара на delta (+1 или -1), минимум 1
  const handleChangeCountGoods = (cartId: number, goodsId: number, delta: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    const cart = currentCarts?.find((c) => c.id === cartId)
    const goods = cart?.goods.find((g) => g.id === goodsId)

    if (!goods) return

    const newAmount = Math.max(1, goods.amount + delta)

    // Не мутируем если значение не изменилось
    if (newAmount === goods.amount) return

    updateGoodsAmount(cartId, goodsId, newAmount)
  }

  const handleRemoveCart = (cartId: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    if (!currentCarts) return

    const updatedCarts = currentCarts.filter((cart) => cart.id !== cartId)

    mutation.mutate(updatedCarts)
  }

  const handleCheckedAllGoods = (cartId: number) => {
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    if (!currentCarts) return

    const cart = currentCarts.find((c) => c.id === cartId)
    if (!cart) return

    const newSelectedState = !cart.isAllSelected

    const updatedCarts = currentCarts.map((c) => {
      if (c.id !== cartId) return c
      return {
        ...c,
        isAllSelected: newSelectedState,
        goods: c.goods.map((item) =>
          item.isDisabled ? item : { ...item, isSelected: newSelectedState },
        ),
      }
    })

    mutation.mutate(updatedCarts)
  }

  return {
    isPending: mutation.isPending,
    removeGoods,
    handleRemoveGoods: removeGoods,
    toggleSelectGoods,
    handleToggleCheckedGoods: toggleSelectGoods,
    updateGoodsAmount,
    handleChangeCountGoods,
    handleRemoveCart,
    handleCheckedAllGoods,
  }
}
