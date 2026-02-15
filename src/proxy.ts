import { type NextRequest, NextResponse } from "next/server"

// роуты только для dev-режима (не отдаются в проде)
const devOnlyRoutes = ["/icons"]

// тут добавить роуты к которым нужна авторизация
// carts,
const protectedRoutes = ["/test"]
const authRoutes = ["/login", "/register"] // тут наоборот роуты к которым нужно быть НЕавторизованным

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Dev-only страницы — 404 в проде
  const isDevOnly = devOnlyRoutes.some((route) => pathname.startsWith(route))
  if (isDevOnly && process.env.BUILD_TYPE === "prod") {
    return new NextResponse(null, { status: 404 })
  }

  // Не авторизован — редирект на логин
  if (isProtected && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Уже авторизован — не пускаем на страницы логина/регистрации
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
