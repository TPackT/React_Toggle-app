/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { key: 'Access-Control-Allow-Origin', value: 'https://*.vercel.app' }
    ]
  }
}

module.exports = nextConfig
