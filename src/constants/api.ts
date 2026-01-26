export const API_URL = process.env.URL_API

export const API_URLS = {
  // users: `${API_URL}/api/users`, доделать process.env.URL_API
  users: "/api/users",
  shops: "/api/shops",
  shop: {
    goods: "/api/goods",
    sp: "/api/sp",
    tff: "/api/tff",
    contacts: "/api/contacts",
  },
  carts: "/api/carts",
}
