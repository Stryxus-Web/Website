import postcssNesting from 'postcss-nesting';
import postcssImport from 'postcss-import';
import tailwindCSS from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const isDev = process.env.NODE_ENV === 'production';

export default {
    plugins: [
        postcssImport,
        postcssNesting,
        tailwindCSS,
        autoprefixer,
        isDev ? cssnano : undefined,
    ],
}