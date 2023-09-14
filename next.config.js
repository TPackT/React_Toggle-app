/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { key: 'Access-Control-Allow-Origin', value: '*' }
    ]
  }
}

module.exports = nextConfig
