const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
const path = require("path")
module.exports = {
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin({
                languages: ["python", "javascript", "cpp", "java"],
                features: ["coreCommands", "find"],
            }),
        ],
    },
    chainWebpack: (config) => {
        config.resolve.alias.set(
            "vscode",
            path.resolve(
                "./node_modules/monaco-languageclient/lib/vscode-compatibility"
            )
        )
    },
}
