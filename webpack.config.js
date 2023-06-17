const path = require('path');
const process = require('process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BlazorAssetCachesPlugin = require('./blazorAssetCachesPlugin');

module.exports = (env, argv) => {
    return {
        entry: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'assets.js'),
        output: {
            path: path.resolve(path.resolve(), 'Client', 'wwwroot'),
            publicPath: '',
            filename: '[name].[contenthash].js',
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
            assetModuleFilename: (pathData) => {
                const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
                return `${filepath.includes('wwwroot-dev/') ? filepath.slice(12) : filepath}/[name].[contenthash][ext]`;
            },
        },
        watch: argv.mode === 'development',
        watchOptions: {
            ignored: [ '**/Stryxus/Client/wwwroot/**', '**/node_modules' ],
        },
        module: {
            rules: [
                {
                    test: /\.sass$/i,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { sourceMap: argv.mode === 'development' } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: function ()
                                    {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            }
                        },
                        { loader: 'sass-loader', options: { sourceMap: argv.mode === 'development' } },
                    ],
                },
                {
                    test: /\.ts$/i,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|json|mp4|aac|svg)$/i,
                    type: 'asset',
                },
                {
                    test: /\.woff2?$/,
                    type: 'asset',
                    generator: {
                        filename: './fonts/[name][contenthash][ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./Client/wwwroot-dev/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "./[name].[contenthash].css",
            }),
            new ESLintPlugin(),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'android-chrome-192x192.png'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'android-chrome-512x512.png'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'apple-touch-icon.png'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'favicon.ico'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'favicon-16x16.png'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'favicon-32x32.png'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                    {
                        from: path.resolve(path.resolve(), 'Client', 'wwwroot-dev', 'site.webmanifest'),
                        to: path.resolve(path.resolve(), 'Client', 'wwwroot')
                    },
                ],
            }),
            {
                apply: (compiler) => {
                    if (argv.mode === 'production') {
                        compiler.hooks.done.tap('DonePlugin', () => {
                            setTimeout(() => {
                                process.exit(0)
                            })
                        });
                    }
                }
            },
            new BlazorAssetCachesPlugin(),
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
                                        speed: process.env.NODE_ENV === 'production' ? 0 : 10,
                                        subsample: 3,
                                    },
                                },
                            },
                            filter: (source, sourcePath) => { return sourcePath.endsWith('png'); },
                        },
                    ],
                }),
            ],
        },
        performance: {
            hints: argv.mode === 'production' ? "warning" : false
        },
        resolve: {
            extensions: ['.ts']
        },
    };
};
