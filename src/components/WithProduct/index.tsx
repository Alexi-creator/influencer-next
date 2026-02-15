"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import clsx from "clsx"

import { Button } from "@/components/ui/Button"
import { request } from "@/utils/request"

import "./styles.scss"

interface WithProductProps<T> {
  className?: string
  contentClassName?: string
  title: string
  btnHeaderText: string
  btnLoadText: string
  btnId?: string
  resourceUrl: string
  queryKey: string
  initialData: T[]
  initialCount: number
  ItemComponent: React.ComponentType<T>
}

export const WithProduct = <T extends { id: number | string }>({
  className,
  contentClassName,
  title,
  btnHeaderText,
  btnLoadText,
  btnId,
  resourceUrl,
  queryKey,
  initialData,
  initialCount,
  ItemComponent,
}: WithProductProps<T>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<{
    data: T[]
    count: number
  }>({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      return request<{ data: T[]; count: number }>(`${resourceUrl}?page=${pageParam}`)
    },
    initialPageParam: 2,
    initialData: {
      pages: [{ data: initialData, count: initialCount }],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((p) => p.data).length
      if (totalLoaded >= lastPage.count) return undefined
      return allPages.length + 1
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const items = data?.pages.flatMap((page) => page.data) ?? initialData

  return (
    <div className={clsx("with-product", className)}>
      <div className="with-product__inner">
        <div className="with-product__title">{title}</div>
        <Button className="with-product__action-btn">{btnHeaderText}</Button>
        <div className={clsx("with-product__content", contentClassName)}>
          {items.map((item) => (
            <ItemComponent key={item.id} {...item} />
          ))}
        </div>
        {hasNextPage && (
          <div className="with-product__load-btn">
            <Button
              id={btnId}
              className="btn--dashed"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Загрузка..." : btnLoadText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
