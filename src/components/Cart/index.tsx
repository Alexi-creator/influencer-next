// "use client"

// import { CartCard } from "../CartCard"
// import "./styles.scss"

// export interface CartProps extends React.HTMLAttributes<HTMLDivElement> {

// }

// export const Cart = ({

// }: CartProps) => {
//   return (
//     <div className="cart">
//       <div className="cart__top">
//       <div className="cart__top-inner">
//         <div className="cart__top-title">
//           Корзина №{data.number} (СП)
//         </div>

//         <div className="cart__top-content">
//           {data.isSP && (
//             <div className="cart__top-wrapper">
//               <div className="cart__top-content-title">Совместная покупка</div>
//               <div className="cart__top-content-feature">
//                 <div className="cart__top-content-catch-phrase">
//                   {data.catchPhrase}
//                 </div>

//                 <div className="cart__top-content-feature-inner">
//                   <div className="cart__top-content-feature-purchases">
//                     <div>
//                       <span>Уже купили на:&nbsp;</span>
//                       <span className="number">{data.soldSum}</span>
//                       <span> / </span>
//                       <span className="number">{data.allSum}</span>
//                       <span className="currency">&nbsp;₽</span>
//                     </div>

//                     {data.isActive && (
//                       <div className="progress progress--primary">
//                         <div
//                           className="progress__line"
//                           style={{ width: data.progress }}
//                         />
//                       </div>
//                     )}

//                     {data.isHappened && (
//                       <div className="progress progress--green">
//                         <div
//                           className="progress__line"
//                           style={{ width: "100%" }}
//                         />
//                       </div>
//                     )}

//                     {data.isNotHappened && (
//                       <div className="progress progress--grey">
//                         <div
//                           className="progress__line"
//                           style={{ width: data.progress }}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     {data.isActive && (
//                       <>
//                         <div>Активна до:</div>
//                         <div className="cart__top-content-event">
//                           {data.date} {data.time}
//                         </div>
//                       </>
//                     )}

//                     {data.isHappened && (
//                       <>
//                         <div>Совм. Покупка:</div>
//                         <div className="cart__top-content-event cart__top-content-event--is-happened">
//                           Состоялась
//                         </div>
//                       </>
//                     )}

//                     {data.isNotHappened && (
//                       <>
//                         <div>Совм. Покупка:</div>
//                         <div className="cart__top-content-event cart__top-content-event--is-not-happened">
//                           Не состоялась
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="cart__top-wrapper">
//             <div className="cart__top-content-title">Магазин</div>
//             <div className="cart__top-seller-inner">
//               <div className="cart__top-seller-inner-content">
//                 <div className="cart__top-seller-img">
//                   <img src="img/shop-avatar.png" alt="Shop avatar" />
//                 </div>
//                 <div className="cart__top-seller-name">
//                   Интернет магазин одежды и аксессуаров Lass
//                 </div>
//               </div>
//               <button className="btn btn--color-primary-light btn--none cart__top-seller-btn">
//                 Подписаться
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="cart__control">
//       {data.isTopControl && (
//         <div className="cart__control-top">
//           <div className="cart__control-top-type">{data.type}</div>

//           {data.isActiveChooseAll && (
//             <div className="cart__control-top-choose-all">
//               <Checkbox
//                 name="allCheckbox"
//                 text="Выбрать все"
//                 mod="checkbox--radius-medium"
//                 classes="cart__control__top-choose-all-txt"
//               />
//             </div>
//           )}

//           {data.isInActiveChooseAll && (
//             <div className="cart__control-top-choose-all-inActive">
//               <Checkbox
//                 name="checkbox"
//                 text="Выбрать все"
//                 mod="checkbox--disabled checkbox--radius-medium"
//                 classes="cart__control__top-choose-all-txt"
//                 disabled
//               />
//             </div>
//           )}
//         </div>
//       )}

//       {data.isBottomControl && (
//         <div className="cart__control-bottom">
//           <div className="cart__control-bottom-results">
//             <div className="cart__control-bottom-results-total">Итого</div>

//             <div className="cart__control-bottom-results-group">
//               <div className="cart__control-bottom-results-group-position">
//                 {data.position} позиции
//               </div>
//               <div className="cart__control-bottom-results-group-amount">
//                 <span className="cart__control-bottom-results-group-amount-number">
//                   {data.amount}
//                 </span>{" "}
//                 шт. товаров
//               </div>
//               <div className="cart__control-bottom-results-group-sum">
//                 <span className="cart__control-bottom-results-group-sum-old">
//                   0 ₽
//                 </span>
//                 <span className="cart__control-bottom-results-group-sum-new">
//                   0 ₽
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="cart__control-bottom-control">
//             {data.canCreateSP && (
//               <div className="cart__control-bottom-control-up">
//                 <button className="btn btn--color-primary-light">
//                   Создать новую SP
//                 </button>
//               </div>
//             )}

//             {data.canUpdateStore && (
//               <div className="cart__control-bottom-control-up">
//                 <button className="btn btn--color-primary-light">
//                   Обновить скидку
//                 </button>
//                 <svg>
//                   <use xlinkHref="./img/icons/icons.svg#info" />
//                 </svg>
//               </div>
//             )}

//             <div className="cart__control-bottom-control-order">
//               <button className="cart__control-bottom-control-btn-del btn btn--none btn--text btn--color-grey">
//                 Удалить эту корзину
//               </button>
//               <button
//                 className="cart__control-bottom-control-btn-order btn"
//                 disabled
//               >
//                 Оформить заказ
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//     <div className="cart__items">
//       <CartCard />
//     </div>
//     </div>
//   )
// }
