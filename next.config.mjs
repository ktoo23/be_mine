import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    additionalData: `
    @use 'constants/index' as *;
    @use 'mixins/index' as *;
  `,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
      },
    ], // faker가 사용하는 도메인 추가
  },
};

export default nextConfig;
