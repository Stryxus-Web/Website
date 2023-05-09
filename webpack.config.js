import path from 'path';
import process from 'process';

import TerserPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config = {
    entry: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'assets.js'),
    output: {
        path: path.resolve(path.resolve(), 'Client', 'wwwroot'),
        publicPath: '',
        filename: '[name].min.js',
        globalObject: 'this',
        clean: true,
        asyncChunks: true,
        environment: {
            arrowFunction: true,
            bigIntLiteral: true,
            const: true,
            destructuring: true,
            dynamicImport: true,
            forOf: true,
            module: true,
            optionalChaining: true,
            templateLiteral: true,
        },
        assetModuleFilename: (pathData) =>
        {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath.includes('wwwroot-dev/') ? filepath.slice(12) : filepath}/[name][ext]`;
        },
    },
    watch: true,
    devServer: {
        http2: true,
    },
    watchOptions: {
        ignored: ["**/Stryxus/Client/wwwroot/webpack/**", "**/node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.sass$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'resolve-url-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(json|mp4|aac|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.woff2$/i,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            },
            {
                test: /\.png$/i,
                type: "asset",
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'index.html'),
                    to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            maxSize: 100000,
        },
        minimize: true,
        minimizer: [
            '...',
            new TerserPlugin({
                parallel: true,
            }),
            new ImageMinimizerPlugin({
                generator: [
                    {
                        type: "asset",
                        implementation: ImageMinimizerPlugin.squooshGenerate,
                        options: {
                            encodeOptions: {
                                avif: {
                                    cqLevel: 18,
                                    speed: process.env.NODE_ENV === 'production' ? 0 : 6,
                                    subsample: 3,
                                },
                            },
                        },
                    },
                    {
                        preset: 'jxl',
                        implementation: ImageMinimizerPlugin.squooshGenerate,
                        options: {
                            encodeOptions: {
                                jxl: {
                                    effort: process.env.NODE_ENV === 'production' ? 9 : 0,
                                    quality: 75,
                                    progressive: false,
                                    epf: -1,
                                    lossyPalette: false,
                                    decodingSpeedTier: 0,
                                    photonNoiseIso: 0,
                                    lossyModular: false,
                                },
                            },
                        },
                    },
                    {
                        preset: 'avif',
                        implementation: ImageMinimizerPlugin.squooshGenerate,
                        options: {
                            encodeOptions: {
                                avif: {
                                    cqLevel: 18,
                                    speed: process.env.NODE_ENV === 'production' ? 0 : 6,
                                    subsample: 3,
                                },
                            },
                        },
                    },
                ],
            }),
        ],
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    resolve: {
        extensions: ['.ts']
    },
};

export default config;
