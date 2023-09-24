class BlazorAssetCachesPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('BlazorAssetCachesPlugin', compilation => {
            compilation.hooks.processAssets.tap({
                name: 'BlazorAssetCachesPlugin',
                stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            }, assets => {
                const sources = compilation.compiler.webpack.sources;
                
                var a = { files: [] };
                Object.entries(assets).forEach(([pathname, source]) => {
                    if (!pathname.endsWith('.html') && !pathname.endsWith('.js') && !pathname.endsWith('.css') && !pathname.endsWith('.woff') && !pathname.endsWith('.woff2')) {
                        a.files.push(pathname.startsWith('/') ? pathname.substring(1) : pathname);
                    }
                });
                compilation.deleteAsset('bac.json');
                compilation.emitAsset('bac.json', new sources.RawSource(JSON.stringify(a)));
            });
        });
    }
}

module.exports = BlazorAssetCachesPlugin;
