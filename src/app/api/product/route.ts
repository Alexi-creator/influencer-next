import { NextResponse } from "next/server"

const productIds = [{ id: 1 }, { id: 2 }, { id: 3 }]

export async function GET() {
  return NextResponse.json({
    data: {
      data: productIds,
    },
  })
}
