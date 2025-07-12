import path from "path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app/styles")],
    prependData: `
      @use "extends" as *;
      @use "variables" as *;
      @use "mixins" as *;
    `,
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.ts"
        }
      },
    }
  },
}

export default nextConfig
