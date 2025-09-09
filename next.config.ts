import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'imgprodutos.s3.us-east-2.amazonaws.com',
      'innovationbrindes.com.br',
    ],
  },
}

export default nextConfig
