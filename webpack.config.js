const path = require('path')
const gasWebpackPlugin = require('gas-webpack-plugin')

module.exports = (env, argv) => {

    const ENTRY_FILE = 'index.ts'
    const BUNDLE_FILE = 'index.gs'

    const SOURCE = 'src'
    const OUTPUT = 'dist'

    const IS_DEVELOPMENT = argv.mode === 'development'

    return {
        entry: {
            index: path.resolve(__dirname, SOURCE, ENTRY_FILE),
        },
        output: {
            path: path.resolve(__dirname, OUTPUT),
            filename: BUNDLE_FILE,
        },
        devtool: IS_DEVELOPMENT ? 'inline-source-map' : 'none',
        resolve: {
            extensions: ['.js', '.ts'],
            modules: [
                Path.resolve(__dirname, 'node_modules'),
            ],
            alias: {
                '@src': Path.resolve(__dirname, SOURCE),
            },
        },
        module: {
            rules: RULES,
        },
        plugins: [
            new gasWebpackPlugin(),
        ],
    }
}

const RULES = [
    {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },
]