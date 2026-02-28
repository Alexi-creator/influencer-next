// export const API_URL = process.env.API_URL
export const API_URL = "http://localhost:3000" // TODO брать из env, переделать

export const API_URLS = {
  users: `${API_URL}/api/users`,
  shops: `${API_URL}/api/shops`,
  shopInfo: `${API_URL}/api/shop/:id`,
  shop: {
    goods: `${API_URL}/api/shop/:id/goods`,
    sp: `${API_URL}/api/shop/:id/sp`,
    tff: `${API_URL}/api/shop/:id/tff`,
    contacts: `${API_URL}/api/shop/:id/contacts`,
  },
  spInfo: `${API_URL}/api/sp/:id`,
  sp: {
    goods: `${API_URL}/api/sp/:id/goods`,
  },
  catalog: `${API_URL}/api/catalog`,
  carts: `${API_URL}/api/carts`,
  publications: `${API_URL}/api/publications`,
  publicationGoods: `${API_URL}/api/publication/goods`,
  publication: `${API_URL}/api/publication/:id`,
  publicationComments: `${API_URL}/api/publication/:id/comments`,
  products: `${API_URL}/api/product`,
  product: `${API_URL}/api/product/:id`,
  productSp: `${API_URL}/api/product/:id/sp`,
  productPublications: `${API_URL}/api/product/:id/publications`,
} as const
