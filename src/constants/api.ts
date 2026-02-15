// export const API_URL = process.env.API_URL
export const API_URL = "http://localhost:3000" // TODO брать из env, переделать

export const API_URLS = {
  users: `${API_URL}/api/users`,
  shops: `${API_URL}/api/shops`,
  shop: {
    goods: `${API_URL}/api/shop/goods`,
    sp: `${API_URL}/api/shop/sp`,
    tff: `${API_URL}/api/shop/tff`,
    contacts: `${API_URL}/api/shop/contacts`,
  },
  catalog: `${API_URL}/api/catalog`,
  carts: `${API_URL}/api/carts`,
  publications: `${API_URL}/api/publications`,
  publication: `${API_URL}/api/publication/:id`,
  publicationComments: `${API_URL}/api/publication/:id/comments`,
  products: `${API_URL}/api/product`,
  product: `${API_URL}/api/product/:id`,
  productSp: `${API_URL}/api/product/:id/sp`,
  productPublications: `${API_URL}/api/product/:id/publications`,
} as const
