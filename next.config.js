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
          value: ".*(Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini).*",
        },
      ],
      permanent: true,
    },
  ];
}

const nextConfig = {
  reactStrictMode: true,
  redirects,
};

module.exports = nextConfig;
