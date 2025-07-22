"use client"

import Image from "next/image"

import { Badge } from "@/components/ui/Badge"

import UserIcon from "@/icons/user.svg"
import { Modal } from "@/components/ui/Modal"
import Link from "next/link"
import { useState } from "react"
import { Login } from "@/components/Login"

interface HeaderLoginProps extends React.HTMLAttributes<HTMLElement> {
  isAuth?: boolean
}

export const HeaderLogin = ({ isAuth = false }: HeaderLoginProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  return (
    <>
      {isAuth ? (
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
