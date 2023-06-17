const path = require('path');
const process = require('process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
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
                let filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
                filepath = filepath.includes('/') ? filepath.slice(12) : filepath.slice(11);
                return `${filepath}/[name].[contenthash][ext]`;
            },
        },
        stats: {
            children: argv.mode === 'development',
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
                            preset: "avif",
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
