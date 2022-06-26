/** @type {import('next').NextConfig} */

async function redirects() {
  return [
    {
      source: "/",
      destination: "/hello",
      has: [
        {
          type: "header",
          key: "User-Agent",
          value: ".*(Mobile|Android|webOS|iPhone|iPad|iPod|iOS|BlackBerry|IEMobile|Opera Mini).*",
        },
      ],
      permanent: true,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  redirects,
  images: {
    domains: ["images.ctfassets.net"],
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", "api.ts", "api.js"],
};

module.exports = nextConfig;
