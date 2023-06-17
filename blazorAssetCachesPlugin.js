class BlazorAssetCachesPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('BlazorAssetCachesPlugin', (compilation, callback) => {
            var a = { files: [] };

            for (var filename in compilation.assets) {
                if (!filename.endsWith('.html') && !filename.endsWith('.js') && !filename.endsWith('.css') && !filename.endsWith('.woff') && !filename.endsWith('.woff2')) {
                    a.files.push(filename);
                }
            }

            a = JSON.stringify(a);
            compilation.assets['bac.json'] = {
                source: () => { return a }
            };
            callback();
        });
    }
}

module.exports = BlazorAssetCachesPlugin;
