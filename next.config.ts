import path from "path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `
      @use "extends" as *;
      @use "variables" as *;
      @use "mixins" as *;
    `,
  },
}

export default nextConfig
