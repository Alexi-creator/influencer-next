"use client"

import { useContext, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { AuthContext } from "@/providers/AuthProvider"

import { authStatuses } from "@/types/authTypes"

import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Login } from "@/components/Login"

import UserIcon from "@/icons/user.svg"

export const HeaderLogin = () => {
  const context = useContext(AuthContext)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const { authStatus } = context

  return (
    <>
      {authStatus === authStatuses.AUTHORIZED ? (
        <Link href={"/profile"} className="header__nav-account">
          <Badge
            className="header__nav-rating badge--font-commissioner badge--color-primary-light badge--without-border"
          >
            Мой рейтинг: 109
          </Badge>
          <div className="header__nav-avatar">
            <Image
              width={40}
              height={40}
              src="/images/avatar.jpg"
              alt="avatar"
            />
          </div>
        </Link>
      ) : (
        <div className="header__nav-sign-in" onClick={() => setIsOpenModal(true)}>
          <UserIcon />
          Войти в аккаунт
        </div>
      )}

      <Modal
        title={<>
          <div className="header__login-title-sign-in">Войдите в свой профиль</div>
          <div className="header__login-title-sign-up">Зарегистрируйтесь</div>
        </>}
        className="header__login"
        titleClassName="header__login-title"
        iconCloseClassName="header__login-close-icon"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <Login />
      </Modal>
    </>
  )
}
