import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/silka",
  images: { unoptimized: true },

  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "gsap",
    "@gsap/react",
    "lenis",
  ],

  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      type: "asset/source",
    });

    return config;
  },
};

export default nextConfig;
