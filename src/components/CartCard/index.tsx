// "use client"

// import "./styles.scss"

// export interface CartCardProps extends React.HTMLAttributes<HTMLDivElement> {

// }

// export const CartCard = ({

// }: CartCardProps) => {
//   return (
//     <div
//       className={`cart-item ${data.disabled ? "cart-item--disabled" : ""}`}
//       data-id={data.id}
//       data-old-price={data.oldSum}
//       data-new-price={data.newSum}
//     >
//       <div className="cart-item__wrapper">
//         {/* === Product Card === */}
//         <div className="cart-item__product-card">
//           <div className="cart-item__product-card-pic">{data.cartCardPic}</div>

//           <div className="cart-item__product-card-description">
//             <div className="cart-item__product-card-description-title">
//               {data.cartCardBrand}
//             </div>
//             <div className="cart-item__product-card-description-txt">
//               {data.cartCardBrandDescription}
//             </div>
//           </div>
//         </div>

//         {/* === Control (Размер / Кол-во) === */}
//         <div className="cart-item__control">
//           <div
//             className={`cart-item__control-size ${
//               data.disabledSize ? "cart-item--disabled-size" : ""
//             }`}
//           >
//             {data.sizes}
//           </div>

//           <div className="cart-item__control-amount">
//             <button
//               className="cart-item__control-minus"
//               disabled={data.disabled}
//             >
//               <svg>
//                 <use xlinkHref="./img/icons/icons.svg#minus" />
//               </svg>
//             </button>

//             <input
//               className="cart-item__control-amount-input"
//               name="control-items"
//               type="text"
//               value={data.amounts}
//               disabled={data.disabled}
//               readOnly
//             />

//             <button
//               className="cart-item__control-plus"
//               disabled={data.disabled}
//             >
//               <svg>
//                 <use xlinkHref="./img/icons/icons.svg#plus" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* === Discount === */}
//         <div
//           className={`cart-item__discount${
//             data.sp ? " cart-item__discount--sp" : ""
//           }${data.store ? " cart-item__discount--store" : ""}`}
//         >
//           <div className="cart-item__discount-upper">
//             <div className="cart-item__discount-upper-title">
//               {data.store && (
//                 <>
//                   <span className="cart-item__discount-upper-title-store--md">
//                     Ваша скидка:
//                   </span>
//                   <span className="cart-item__discount-upper-title-store--mobile">
//                     Скидка:
//                   </span>
//                 </>
//               )}

//               {data.sp && (
//                 <>
//                   <span className="cart-item__discount-upper-title-sp--mobile">
//                     Скидка:
//                   </span>
//                   <span className="cart-item__discount-upper-title-sp--md">
//                     Ваша скидка:
//                   </span>
//                   <span className="cart-item__discount-upper-title-sp--lg">
//                     Скидка в СП:
//                   </span>
//                 </>
//               )}
//             </div>

//             <div className="cart-item__discount-upper-size">
//               <div className="badge badge--discount-cart">-23%</div>
//             </div>
//           </div>
//         </div>

//         {/* === Navigate choose === */}
//         <div
//           className={`cart-item__navigate-choose${
//             data.store ? " cart-item__navigate-choose--store" : ""
//           }`}
//         >
//           {data.disabled ? (
//             <>
//               <svg
//                 data-tooltip={`Товара выбранного вами размера не осталось в наличии.
//                 Вы можете удалить его из корзины или
//                 <a href='#' class='cart-item__tooltip btn btn--primary btn--none'>
//                   Выбрать другой размер
//                 </a>`}
//               >
//                 <use xlinkHref="./img/icons/icons.svg#info" />
//               </svg>
//               <span>Товар недоступен</span>
//             </>
//           ) : (
//             <Checkbox
//               name="checkbox"
//               text="Выбрать"
//               mod="checkbox--radius-medium"
//               classes="cart-control__top-choose-all-txt"
//             />
//           )}
//         </div>

//         {/* === Navigate price === */}
//         <div
//           className={`cart-item__navigate-price${
//             data.store ? " cart-item__navigate-price--store" : ""
//           }`}
//         >
//           <span className="cart-item__navigate-price-old-sum">
//             {data.totalOldSum} ₽
//           </span>
//           <span className="cart-item__navigate-price-new-sum">
//             {data.totalNewSum} ₽
//           </span>
//         </div>

//         {/* === Delete button === */}
//         <div
//           className={`cart-item__delete${
//             data.store ? " cart-item__delete--store" : ""
//           }`}
//         >
//           <button className="btn btn--text btn--color-grey btn--none">
//             Удалить
//           </button>
//         </div>

//         {/* === Discount details (только для store) === */}
//         {data.store && (
//           <div className="cart-item__discount-details">
//             <div className="cart-item__discount-store">
//               <span>
//                 1 шт. {data.onePieceDiscount}
//               </span>
//               <span>
//                 2-3 шт. {data.threePiecesDiscount}
//               </span>
//               <span>
//                 4 шт. и более {data.fourPiecesDiscount}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
