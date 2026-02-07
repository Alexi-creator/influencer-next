export const API_URL = process.env.API_URL

export const API_URLS = {
  // users: `${API_URL}/api/users`, доделать process.env.API_URL
  users: "/api/users",
  shops: "/api/shops",
  shop: {
    goods: "/api/goods",
    sp: "/api/sp",
    tff: "/api/tff",
    contacts: "/api/contacts",
  },
  carts: "/api/carts",
  publication: "/api/publication/:id",
  publicationComments: "/api/publication/:id/comments",
} as const
