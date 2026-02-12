import { ClockIcon } from "@/icons/ClockIcon"
import { EmailIcon } from "@/icons/EmailIcon"
import { PhoneIcon } from "@/icons/PhoneIcon"

import "./styles.scss"

interface ContactInfoProps {
  email: string
  phone: string
  schedule: string
  companyName: string
  legalAddress: string
  legalPhone: string
  inn: string
  kpp: string
  ogrn: string
}

export const ContactInfo = ({
  email,
  phone,
  schedule,
  companyName,
  legalAddress,
  legalPhone,
  inn,
  kpp,
  ogrn,
}: ContactInfoProps) => {
  return (
    <div className="contact-info">
      <div className="contact-info__connect">
        <div className="contact-info__connect-item contact-info__mail">
          <EmailIcon />
          {email}
        </div>
        <div className="contact-info__connect-item contact-info__phone">
          <PhoneIcon />
          {phone}
        </div>
        <div className="contact-info__connect-item contact-info__schedule">
          <ClockIcon />
          {schedule}
        </div>
      </div>

      <div className="contact-info__descr">
        <h3 className="contact-info__descr-title">Юридическая информация:</h3>
        <p>
          Полное наименование: {companyName}
          <br />
          Юридический адрес: {legalAddress}
          <br />
          Телефон: {legalPhone}
        </p>
        <div>
          ИНН/КПП: {inn} / {kpp}
          <div>ОГРН: {ogrn}</div>
        </div>
      </div>
    </div>
  )
}
