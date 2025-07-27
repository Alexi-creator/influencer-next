import { useContext, useState } from "react"
import clsx from "clsx"

import { Input } from "@/components/ui/Input"
import { Location } from "@/components/Location"
import { Radio } from "@/components/ui/Radio"

import { AddressContext } from "@/providers/AddressProvider"
import { GlobalModalProps } from "@/providers/GlobalModalProvider"

// import { AddressStatusEnum } from "@/types/addressTypes"

import { ArrowGoLeftIcon } from "@/icons/ArrowGoLeftIcon"
import { CrossIcon } from "@/icons/CrossIcon"
import { SearchIcon } from "@/icons/SearchIcon"

import "./styles.scss"

const initialCities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
  "Пермь",
  "Воронеж",
  "Волгоград",
  "Саратов",
  "Тюмень",
  "Тольятти",
  "Ижевск",
  "Барнаул",
]

interface ChooseCityProps {
  // addressStatus: AddressStatusEnum
  // currentCity: string
  setConfigModal: React.Dispatch<React.SetStateAction<GlobalModalProps>>
}

export const ChooseCity = ({
  // addressStatus,
  // currentCity,
  setConfigModal,
}: ChooseCityProps) => {
  const [cities, setCities] = useState(initialCities)
  const [inputValue, setInputValue] = useState<string>("")

  const context = useContext(AddressContext)
  const { addressInfo, setAddressInfo } = context
  const currentCity = addressInfo.currentAddress as string
  // const { addressStatus } = addressInfo

  const handleSelectCity = (city: string) =>{
    setAddressInfo(prev => ({
      ...prev,
      currentAddress: city,
    }))

    setInputValue("")
    setCities([city, ...initialCities.filter(item => item !== city)])
  }

  const handleBackModal = () => {
    setConfigModal(prev => ({
      ...prev,
      title: "Куда доставить заказ?",
      className: "header__location",
      content: <Location setConfigModal={setConfigModal} />,
    }))
  }

  const handleCloseModal = () => setConfigModal(prev => ({ ...prev, isOpen: false }))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value
    const match = new RegExp(newVal, "i")
    const citiesMatches = cities.filter(city => match.test(city))

    setInputValue(newVal)
    setCities(newVal && citiesMatches || [currentCity, ...initialCities.filter(item => item !== currentCity)])
  }

  return (
    <div className="choose-city">
      <div className="choose-city__inner">
        <div className="choose-city__header">
          <button
            className="choose-city__back"
            onClick={handleBackModal}
          >
            <ArrowGoLeftIcon className="choose-city__back-icon" />
          </button>

          <div className="choose-city__title">Выберите город</div>

          <button className="choose-city__cross" onClick={handleCloseModal}>
            <CrossIcon
              className="choose-city__cross-icon"
            />
          </button>
        </div>

        <div className="choose-city__search">
          <Input
            name="searchCity"
            value={inputValue}
            placeholder="Найдите свой город"
            prefixNode={<SearchIcon />}
            onChange={handleInputChange}
          />
        </div>

        <ul className="choose-city__list">
          {cities.map(city => (
            <li key={city} className="choose-city__list-item">
              <Radio
                name="city"
                value={city}
                className={clsx({
                  "radio--active": currentCity === city,
                })}
                defaultChecked={currentCity === city}
                onChange={() => handleSelectCity(city)}
              >
                {city}
              </Radio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
