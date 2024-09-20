/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { configureRuntimeEnv } = require('next-runtime-env/build/configure')
const { env } = require('next-runtime-env')

configureRuntimeEnv()

const restURL = new URL(env('NEXT_PUBLIC_REST_API_URL'))

// Remove this if you're not using Fullcalendar features

/** @type {import('next').NextConfig} */
module.exports = {
  // useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/core',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid',
    'd3-org-chart',
    '@uiw/react-color'
  ],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    config.watchOptions.ignored = './node_modules'

    return config
  },

  // ========== GANTI KALAU MAU PROD
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: [restURL.hostname],
    remotePatterns: [
      {
        protocol: restURL.protocol.replace(':', ''),
        hostname: restURL.hostname,
        port: restURL.port,
        pathname: '/assets/**'
      }
    ]
  }
}
