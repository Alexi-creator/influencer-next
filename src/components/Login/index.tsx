"use client"

import VkIcon from "@/icons/vk.svg"
import GoogleIcon from "@/icons/google.svg"
import ArrowIcon from "@/icons/arrow.svg"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "../ui/Input"

import "./styles.scss"

export const Login = () => {
  const [openForm, setOpenForm] = useState<"signIn" | "signUp">("signIn")

  return (
    <>
      {openForm === "signIn" ? (
        <div className="login login--sign-in">
          <div className="login__inner">

            {/* Блок логина */}
            <div className="login__sign-in">
              <div className="login__descr">
                Чтобы пользоваться лентой новостей
              </div>
              <div className="login__options">
                <Button className="login__options-item">
                  <GoogleIcon />
                  Войти через Google
                  <ArrowIcon className="login__options-item-arrow" />
                </Button>
                <Button className="login__options-item">
                  <VkIcon />
                  Войти через ВКонтакте
                  <ArrowIcon className="login__options-item-arrow" />
                </Button>
              </div>
              <div className="login__or">
                <span className="login__or-text">или</span>
              </div>

              <form className="login__form login__form-sign-in">
                <Input
                  name="email"
                  placeholder="Введите свою эл. почту"
                  className="input-text--color-grey login__form-item"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  className="input-text--color-grey login__form-item"
                />
                <Button className="login__form-submit" type="submit">
                  Войти
                </Button>
              </form>

              <div className="login__choice">
                <div className="login__choice-title">Нет аккаунта?</div>
                <Button
                  className="btn--none login__choice-btn login__choice-sign-up"
                  type="button"
                  onClick={() => setOpenForm("signUp")}
                >
                  Зарегистрируйтесь
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Блок регистрации
        <div className="login login--sign-up">
          <div className="login__inner">
            <div className="login__sign-up">
              <div className="login__descr">
                Чтобы подписываться на акции, создавать публикации и сохранять любимые товары
              </div>
              <div className="login__options">
                <Button className="login__options-item" type="button">
                  <GoogleIcon />
                  Регистрация через Google
                  <ArrowIcon className="login__options-item-arrow" />
                </Button>
                <Button className="login__options-item" type="button">
                  <VkIcon />
                  Регистрация через ВКонтакте
                  <ArrowIcon className="login__options-item-arrow" />
                </Button>
              </div>
              <div className="login__or">
                <span className="login__or-text">или</span>
              </div>

              <form className="login__form login__form-sign-up">
                <Input
                  name="email"
                  type="text"
                  placeholder="Введите свою эл. почту"
                  className="input-text--color-grey login__form-item"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Придумайте пароль"
                  className="input-text--color-grey login__form-item"
                />
                <Input
                  name="repeat_password"
                  type="password"
                  placeholder="Повторите ввод пароля"
                  className="input-text--color-grey login__form-item"
                />
                <Button className="login__form-submit" type="submit">
                  Зарегистрироваться
                </Button>
              </form>

              <div className="login__choice">
                <div className="login__choice-title">Есть аккаунт?</div>
                <Button
                  className="btn--none login__choice-btn login__choice-sign-in"
                  type="button"
                  onClick={() => setOpenForm("signIn")}
                >
                  Войти
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
