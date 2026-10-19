/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack(기본 번들러)을 사용한다. MDX는 Velite가 빌드 전·개발 중(`velite --watch`)에
  // `.velite/`로 변환하므로 번들러 플러그인이 필요 없다.
  reactStrictMode: true,
};

export default nextConfig;
