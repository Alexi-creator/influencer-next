import { useMutation, useQueryClient } from "@tanstack/react-query"
import { revalidateCarts } from "@/app/actions/carts/revalidate"
import { API_URLS } from "@/constants/api"
import { HttpMethods } from "@/constants/httpMethods"
import { cartsQueryKey } from "@/settings/carts"
import type { CartTypes, DataTypes, UpdateCartPayload } from "@/types/carts"
import { request } from "@/utils/request"

export const useUpdateCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (payload: UpdateCartPayload) => {
      const res = await request<DataTypes>(API_URLS.carts, {
        method: HttpMethods.PUT,
        body: JSON.stringify(payload),
      })

      return res.data.data
    },

    // Оптимистичное обновление: обновляем UI до получения ответа от сервера
    onMutate: async (payload: UpdateCartPayload) => {
      // Отменяем текущие get запросы
      await queryClient.cancelQueries({ queryKey: [cartsQueryKey] })

      // Сохраняем предыдущее состояние для отката в случае ошибки
      const previousCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])

      // Оптимистичное удаление корзины
      if (previousCarts && payload.type === "cart-remove") {
        const { cartId } = payload.payload
        const updatedCarts = previousCarts.filter((cart) => cart.id !== cartId)
        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)

        return { previousCarts }
      }

      // Оптимистичное переключение выделения всех товаров в корзине
      if (previousCarts && payload.type === "cart-select-all") {
        const { cartId, isAllSelected } = payload.payload
        // Новое состояние - противоположное текущему
        const newSelectedState = !isAllSelected

        const updatedCarts = previousCarts.map((cart) => {
          if (cart.id !== cartId) return cart

          return {
            ...cart,
            isAllSelected: newSelectedState,
            goods: cart.goods.map((item) =>
              item.isDisabled ? item : { ...item, isSelected: newSelectedState },
            ),
          }
        })
        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)

        return { previousCarts }
      }

      // Оптимистичное обновление товаров
      if (previousCarts && payload.type === "goods") {
        const { cartId, goodsId, action, amount } = payload.payload

        const updatedCarts = previousCarts.map((cart) => {
          if (cart.id !== cartId) return cart

          switch (action) {
            case "remove":
              return {
                ...cart,
                goods: cart.goods.filter((item) => item.id !== goodsId),
              }

            case "toggle-select": {
              // Обновляем isSelected у товара
              const updatedGoods = cart.goods.map((item) =>
                item.id === goodsId ? { ...item, isSelected: !item.isSelected } : item,
              )

              // Находим товар после обновления
              const toggledItem = updatedGoods.find((item) => item.id === goodsId)
              const newItemSelected = toggledItem?.isSelected ?? false

              // Вычисляем новое состояние isAllSelected
              let newIsAllSelected = cart.isAllSelected

              if (newItemSelected) {
                // Если включили - проверяем все ли non-disabled товары выбраны
                const allNonDisabledSelected = updatedGoods
                  .filter((item) => !item.isDisabled)
                  .every((item) => item.isSelected)
                if (allNonDisabledSelected) {
                  newIsAllSelected = true
                }
              } else {
                // Если выключили - снимаем isAllSelected если был включен
                if (cart.isAllSelected) {
                  newIsAllSelected = false
                }
              }

              return {
                ...cart,
                isAllSelected: newIsAllSelected,
                goods: updatedGoods,
              }
            }

            case "update-amount":
              return {
                ...cart,
                goods: cart.goods.map((item) =>
                  item.id === goodsId && amount !== undefined ? { ...item, amount } : item,
                ),
              }

            default:
              return cart
          }
        })

        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)
      }

      return { previousCarts }
    },

    // При успехе - обновляем данные из ответа сервера
    onSuccess: (updatedCarts) => {
      queryClient.setQueryData<CartTypes[]>([cartsQueryKey], updatedCarts)

      // TODO после подключения реальной апишки нужно расскомментировать
      // revalidateCarts()
    },

    // При ошибке - откатываем оптимистичное обновление
    onError: (_error, _payload, context) => {
      if (context?.previousCarts) {
        queryClient.setQueryData<CartTypes[]>([cartsQueryKey], context.previousCarts)
      }
    },
  })

  // Функции-триггеры (с защитой от повторных кликов)
  const removeGoods = (cartId: number, goodsId: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "remove",
      },
    }
    mutation.mutate(payload)
  }

  const toggleSelectGoods = (cartId: number, goodsId: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "toggle-select",
      },
    }
    mutation.mutate(payload)
  }

  const updateGoodsAmount = (cartId: number, goodsId: number, amount: number) => {
    const payload: UpdateCartPayload = {
      type: "goods",
      payload: {
        cartId,
        goodsId,
        action: "update-amount",
        amount,
      },
    }
    mutation.mutate(payload)
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
    const payload: UpdateCartPayload = {
      type: "cart-remove",
      payload: { cartId },
    }
    mutation.mutate(payload)
  }

  const handleCheckedAllGoods = (cartId: number) => {
    // Получаем текущее состояние корзины
    const currentCarts = queryClient.getQueryData<CartTypes[]>([cartsQueryKey])
    const cart = currentCarts?.find((c) => c.id === cartId)

    if (!cart) return

    const payload: UpdateCartPayload = {
      type: "cart-select-all",
      payload: { cartId, isAllSelected: cart.isAllSelected },
    }
    mutation.mutate(payload)
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
