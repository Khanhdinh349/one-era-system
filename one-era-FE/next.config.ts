/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  serverExternalPackages: ['sqlite3', 'sqlite'], // Tên mới theo chuẩn Next.js 15
};

export default nextConfig;