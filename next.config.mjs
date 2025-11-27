import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
  // ESLint 무시 (마이그레이션 중 빌드 에러 방지용, 추후 제거)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler) {
    // 개발 모드에서만 실행, 프로덕션 빌드시는 별도 프로세스로 돔
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
