import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      dashboard: path.resolve(__dirname, 'src/dashboard'),
      shared: path.resolve(__dirname, 'src/shared'),
      widget: path.resolve(__dirname, 'src/widget'),
      assets: path.resolve(__dirname, 'src/dashboard/assets'),
      components: path.resolve(__dirname, 'src/dashboard/components'),
    };

    if (!isServer) {
      config.output.filename = (chunkData) =>
        chunkData.chunk.name === 'sdk' ? 'js/[name].js' : 'js/[name]-[hash].js';
    }

    return config;
  },
};

export default nextConfig;