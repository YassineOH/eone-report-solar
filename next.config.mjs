import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        config.module.rules.push({
            test: /\.(ttf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '/_next/static/fonts/', // Adjust the public path as needed
                        outputPath: 'static/fonts/', // Specify the output path directly
                        esModule: false, // Add this option
                    },
                },
            ],
        });
        return config
    },
    transpilePackages: ['@react-pdf/renderer'],

};

export default withNextIntl(nextConfig);