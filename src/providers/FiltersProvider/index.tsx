// "use client"

// import { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react"

// interface FiltersContextType {
//   isLoading: boolean
//   data: Record<string, string>
//   setFiltersData: Dispatch<SetStateAction<Record<string, string>>>
//   setInitialData: () => void
// }

// export const FiltersContext = createContext<FiltersContextType>({
//   isLoading: false,
//   data: {},
//   setFiltersData: () => undefined,
//   setInitialData: () => undefined
// })

// export const FiltersProvider = ({ children }: { children: ReactNode }) => {
//   const [filtersData, setFiltersData] = useState({})
//   const [isLoading, setIsLoading] = useState(false)

//   const changeFilters = () => {
//     setIsLoading(true)
//     // fetch
//     setIsLoading(false)
//   }

//   const setInitialData = initialData => {
//     setFiltersData(initialData)
//   }

//   return (
//     <FiltersContext value={{ isLoading, data: filtersData, setInitialData }}>
//       {children}
//     </FiltersContext>
//   )
// }
